const fs = require('fs');
const file = '/Users/edmararocha/Documents/Business Syllabus/components/business-syllabus/conteudos-page-client.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/'M4-T1-S2': 'M1-S2', \/\/ Pensamento Criativo/g, "'M4-T1-S2': 'M4-T1-S2', // Pensamento Criativo");
content = content.replace(/'M4-T1-S3': 'M1-S3', \/\/ Sustentabilidade em Negócios/g, "'M4-T1-S3': 'M4-T1-S3', // Sustentabilidade em Negócios");
content = content.replace(/'M4-T1-S4': 'M2-S1', \/\/ Gestão de Negócios/g, "'M4-T1-S4': 'M4-T1-S4', // Gestão de Negócios");
content = content.replace(/'M4-T1-S5': 'M2-S2', \/\/ Demonstrações Contábeis/g, "'M4-T1-S5': 'M4-T1-S5', // Demonstrações Contábeis");
content = content.replace(/'M4-T1-S6': 'M2-S3', \/\/ Matemática Financeira/g, "'M4-T1-S6': 'M4-T1-S6', // Matemática Financeira");
content = content.replace(/'M4-T1-S7': 'M3-S1', \/\/ Economia de Empresa e Análise Mercadológica/g, "'M4-T1-S7': 'M4-T1-S7', // Economia de Empresa e Análise Mercadológica");
content = content.replace(/'M4-T1-S8': 'M3-S2', \/\/ Liderança e Gestão de Equipes/g, "'M4-T1-S8': 'M4-T1-S8', // Liderança e Gestão de Equipes");

content = content.replace(/'M4-T2-S2': 'M6-S1', \/\/ Análise Financeira \(M6-S1 no BD\)/g, "'M4-T2-S2': 'M4-T2-S2', // Análise Financeira");
content = content.replace(/'M4-T2-S3': 'M2-S3', \/\/ Matemática Financeira \(M2-S3 no BD\)/g, "'M4-T2-S3': 'M4-T2-S3', // Matemática Financeira");
content = content.replace(/'M4-T2-S4': 'M2-S2', \/\/ Demonstrações Contábeis \(M2-S2 no BD\)/g, "'M4-T2-S4': 'M4-T1-S5', // Demonstrações Contábeis");

content = content.replace(/'M4-T3-S1': 'M3-S2', \/\/ Liderança e Gestão de Equipes \(M3-S2 no BD\)/g, "'M4-T3-S1': 'M4-T3-S1', // Liderança e Gestão de Equipes");
content = content.replace(/'M4-T3-S2': 'M3-S2', \/\/ Liderança e Gestão de Equipes \(M3-S2 no BD\)/g, "'M4-T3-S2': 'M4-T3-S2', // Liderança e Gestão de Equipes");

content = content.replace(/'M4-T4-S1': 'M2-S1', \/\/ Gestão de Negócios \(M2-S1 no BD\)/g, "'M4-T4-S1': 'M4-T4-S1', // Gestão de Negócios");
content = content.replace(/'M4-T4-S2': 'M2-S1', \/\/ Gestão de Negócios \(M2-S1 no BD\)/g, "'M4-T4-S2': 'M4-T4-S2', // Gestão de Negócios");

content = content.replace(/'M4-T5-S1': 'M3-S1', \/\/ Economia de Empresa e Análise Mercadológica \(M3-S1 no BD\)/g, "'M4-T5-S1': 'M4-T5-S1', // Economia de Empresa e Análise Mercadológica");

fs.writeFileSync(file, content);