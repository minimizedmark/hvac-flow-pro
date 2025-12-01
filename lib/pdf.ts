import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export async function generatePDF(content: string, customerName: string) {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([850, 1100])
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const lines = content.split('\n')
  let y = 1000

  page.drawText('HVAC Flow Pro – Good/Better/Best Proposal', {
    x: 50,
    y: y,
    size: 28,
    font: bold,
    color: rgb(0, 0.4, 0.8),
  })
  y -= 50
  page.drawText(`Prepared for: ${customerName}`, { x: 50, y, size: 18, font: bold })
  y -= 40

  for (const line of lines) {
    if (y < 100) {
      page = pdfDoc.addPage([850, 1100])
      y = 1000
    }
    page.drawText(line, { x: 50, y, size: 14, font, color: rgb(0, 0, 0) })
    y -= 22
  }

  page.drawText('Thank you for your business.', {
    x: 50,
    y: 80,
    size: 16,
    font: bold,
    color: rgb(0, 0.5, 0),
  })

  return await pdfDoc.save()
}
