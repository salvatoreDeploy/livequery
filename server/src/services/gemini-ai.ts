import { GoogleGenAI } from "@google/genai";
import { env } from "../env.ts";

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,

});

const model = 'gemini-2.5-flash'

export async function transcribeAudio(audioAsBase64: string, mimeType: string){
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: "Transcreva o áudio para portugues do Brasil. Seja preciso e natural na transcrição. Matenha a pontuação adeqauda e divida o texto em paragrafos quando for apropriado."
      },
      {
        inlineData:{
          mimeType,
          data: audioAsBase64
        }
      }
    ]
  })

  if(!response.text){
    throw new Error('Não foi possivel transcrever o audio')
  }

  return response.text
}

export async function generateEmbeddings(text: string){
  const response = await gemini.models.embedContent({
    model: 'text-embedding-004',
    contents:[{text}],
    config: {
      taskType: 'RETRIEVAL_DOCUMENT'
    }
  })

  if(!response.embeddings?.[0].values){
    throw new Error('Não foi possivel gerar os embbeddings')
  }

  return response.embeddings[0].values;
}

export async function generateAnswer(question: string, transcription: string[]){
  const context = transcription.join('\n\n')

  const prompt = `
    Com base no texto fornecido abaixo como contexto, responda a pergunta de forma clara e precisa em portugues do Brasil.

    CONTEXTO:
    ${context}

    PERGUNTA:
    ${question}

    INSTRUÇÕES:
    - Use apenas informações contidas no contexto enviado;
    - Se a resposta não for encontrada no contexto, apenas responda que não possui informações suficiente para ser respondida;
    - Seja Objetivo;
    - Mantenha um tom educativo e profissional;
    - Cite trechos relevantes do Contexto se apropriado;
    - Se for citar o contexto, utilize o termo "Conteudo da Aula";
  `.trim();

  const response = await gemini.models.generateContent({
    model,
    contents:[
      {
        text: prompt
      }
    ]
  })

  if(!response.text){
    throw new Error('Falha ao gerar uma resposta pela IA')
  }

  return response.text
}