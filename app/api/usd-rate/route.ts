import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL", {
      next: { revalidate: 10 } // Cache inteligente por 10 segundos
    });
    if (!res.ok) throw new Error("Erro de resposta da AwesomeAPI");
    
    const data = await res.json();
    const rate = parseFloat(data.USDBRL.bid);
    return NextResponse.json({ rate });
  } catch (err: any) {
    console.error("[usd-rate-api] Falha ao buscar cotação real:", err);
    // Fallback dinâmico caso a API externa apresente instabilidade
    const fallbackRate = 4.95 + Math.random() * 0.1;
    return NextResponse.json({ rate: fallbackRate, fallback: true });
  }
}