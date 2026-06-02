import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { supabaseAdmin } from "@/lib/supabase"

const RESPONSES_FILE_PATH = path.join(process.cwd(), "data", "survey_responses.json")

// Garantir que o diretório data exista e o arquivo seja inicializado
function ensureFileExists() {
  const dirPath = path.dirname(RESPONSES_FILE_PATH)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
  if (!fs.existsSync(RESPONSES_FILE_PATH)) {
    fs.writeFileSync(RESPONSES_FILE_PATH, JSON.stringify([], null, 2))
  }
}

// GET: Retorna todas as respostas anônimas
export async function GET() {
  try {
    ensureFileExists()
    
    // 1. Tenta buscar do Supabase se estiver configurado
    try {
      const db = supabaseAdmin()
      const { data, error } = await db
        .from("survey_responses")
        .select("*")
        .order("timestamp", { ascending: false })
      
      if (!error && data) {
        console.log("[survey-api] Respostas recuperadas do Supabase.")
        return NextResponse.json(data)
      }
      if (error) {
        console.warn("[survey-api-db-warn] Tabela survey_responses inexistente ou erro Supabase:", error.message)
      }
    } catch (supabaseErr: any) {
      // Ignora erro se Supabase não estiver configurado
    }

    // 2. Fallback para arquivo JSON local
    const fileContent = fs.readFileSync(RESPONSES_FILE_PATH, "utf-8")
    const data = JSON.parse(fileContent)
    
    // Ordena de forma decrescente por timestamp
    const sortedData = data.sort((a: any, b: any) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    return NextResponse.json(sortedData)
  } catch (err: any) {
    console.error("[survey-api-error]", err)
    return NextResponse.json({ error: err.message || "Erro interno" }, { status: 500 })
  }
}

// POST: Salva uma nova resposta anônima
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { category, question, score, text } = body

    if (!category || score === undefined) {
      return NextResponse.json({ error: "Campos 'category' e 'score' são obrigatórios." }, { status: 400 })
    }

    const newResponse = {
      id: `resp-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      category,
      question: question || "Pergunta Avulsa",
      score: Number(score),
      text: text || "",
      timestamp: new Date().toISOString()
    }

    // 1. Tenta gravar no Supabase
    let savedInDb = false
    try {
      const db = supabaseAdmin()
      const { error } = await db
        .from("survey_responses")
        .insert({
          category: newResponse.category,
          question: newResponse.question,
          score: newResponse.score,
          text: newResponse.text,
          timestamp: newResponse.timestamp
        })
      
      if (!error) {
        savedInDb = true
        console.log("[survey-api] Resposta salva no Supabase com sucesso.")
      } else {
        console.warn("[survey-api-db-warn] Falha ao inserir resposta no Supabase:", error.message)
      }
    } catch (supabaseErr: any) {
      // Ignora erro
    }

    // 2. Sempre grava localmente também (para consistência offline e local)
    ensureFileExists()
    const fileContent = fs.readFileSync(RESPONSES_FILE_PATH, "utf-8")
    const data = JSON.parse(fileContent)
    
    data.push(newResponse)
    fs.writeFileSync(RESPONSES_FILE_PATH, JSON.stringify(data, null, 2))

    return NextResponse.json({ success: true, savedInDb, data: newResponse })
  } catch (err: any) {
    console.error("[survey-api-submit-error]", err)
    return NextResponse.json({ error: err.message || "Erro interno" }, { status: 500 })
  }
}