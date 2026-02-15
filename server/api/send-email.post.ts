import { Resend } from 'resend'

const config = useRuntimeConfig()
const resend = new Resend(config.resendApiKey)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // On extrait les infos nécessaires
  const { customerName, productRef, productName, problem, photoUrls } = body

  try {
    const { data, error } = await resend.emails.send({
      from: 'Warranty Manager <onboarding@resend.dev>', // Plus tard, tu mettras ton propre domaine
      to: ['roro_spike@hotmail.com'], // Ton adresse pour recevoir les alertes
      subject: `🚨 Nouveau SAV : ${productName} (${productRef})`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #2563eb;">Nouvelle Demande SAV</h2>
          <p>Une nouvelle demande a été déposée par <strong>${customerName}</strong>.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px;">
            <p><strong>Produit :</strong> ${productName}</p>
            <p><strong>Référence :</strong> ${productRef}</p>
            <p><strong>Problème :</strong> ${problem}</p>
          </div>

          <p><strong>Photos jointes :</strong></p>
          <ul>
            ${photoUrls.map((url: string) => `<li><a href="${url}">Voir la photo</a></li>`).join('')}
          </ul>

          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <a href="https://https://warranty-manager-seven.vercel.app/dashboard/dashboard" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Accéder au Dashboard</a>
        </div>
      `
    })
    if (error || !data) {
      console.error('Erreur retournée par Resend:', error)
      throw new Error(error?.message || 'Erreur inconnue')
    }

    return { success: true, id: data.id }
  } catch (error: any) {
    console.error('Erreur Resend:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Impossible d\'envoyer l\'email d\'alerte.'
    })
  }
})
