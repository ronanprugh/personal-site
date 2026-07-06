import { jsPDF } from "jspdf";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { skills } from "@/data/skills";

const PAGE_WIDTH = 210;
const MARGIN = 18;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const PAGE_HEIGHT = 297;
const BOTTOM_MARGIN = 20;

function ensureSpace(doc: jsPDF, y: number, needed: number): number {
  if (y + needed > PAGE_HEIGHT - BOTTOM_MARGIN) {
    doc.addPage();
    return MARGIN;
  }
  return y;
}

function drawSectionHeader(doc: jsPDF, title: string, y: number): number {
  y = ensureSpace(doc, y, 14);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(30, 30, 30);
  doc.text(title.toUpperCase(), MARGIN, y);
  y += 1.5;
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  return y + 5;
}

function drawWrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const lines = doc.splitTextToSize(text, maxWidth) as string[];
  for (const line of lines) {
    y = ensureSpace(doc, y, lineHeight);
    doc.text(line, x, y);
    y += lineHeight;
  }
  return y;
}

export function generateResumePdf(): void {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN;

  // ── Header ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(20, 20, 20);
  doc.text(profile.name, MARGIN, y);
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(80, 80, 80);

  const contactParts = [
    profile.linkedinUrl.replace("https://www.", ""),
    profile.githubUrl.replace("https://", ""),
  ];
  doc.text(contactParts.join("  •  "), MARGIN, y);
  y += 8;

  // ── About ──
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(50, 50, 50);
  y = drawWrappedText(doc, profile.about, MARGIN, y, CONTENT_WIDTH, 4.2);
  y += 4;

  // ── Experience ──
  y = drawSectionHeader(doc, "Experience", y);

  for (const job of experience) {
    y = ensureSpace(doc, y, 18);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(30, 30, 30);
    doc.text(job.title, MARGIN, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(100, 100, 100);
    const dateStr = `${job.startDate} – ${job.endDate}`;
    const dateWidth = doc.getTextWidth(dateStr);
    doc.text(dateStr, PAGE_WIDTH - MARGIN - dateWidth, y);
    y += 4.5;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(9.5);
    doc.setTextColor(60, 60, 60);
    doc.text(`${job.company}  —  ${job.location}`, MARGIN, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(50, 50, 50);

    for (const item of job.responsibilities) {
      y = ensureSpace(doc, y, 8);
      doc.text("•", MARGIN + 1, y);
      y = drawWrappedText(doc, item, MARGIN + 5, y, CONTENT_WIDTH - 5, 3.8);
      y += 1;
    }

    y += 3;
  }

  // ── Education ──
  y = drawSectionHeader(doc, "Education", y);

  for (const edu of education) {
    y = ensureSpace(doc, y, 12);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(30, 30, 30);
    doc.text(edu.institution, MARGIN, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(100, 100, 100);
    const gradWidth = doc.getTextWidth(edu.graduationDate);
    doc.text(edu.graduationDate, PAGE_WIDTH - MARGIN - gradWidth, y);
    y += 4.5;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(9.5);
    doc.setTextColor(60, 60, 60);
    const degreeStr = `${edu.degree} in ${edu.field}${edu.honors ? `, ${edu.honors}` : ""}`;
    doc.text(degreeStr, MARGIN, y);
    y += 7;
  }

  // ── Skills ──
  y = drawSectionHeader(doc, "Skills", y);

  doc.setFontSize(9);
  for (const cat of skills) {
    y = ensureSpace(doc, y, 8);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 30);
    doc.text(`${cat.category}: `, MARGIN, y);
    const labelWidth = doc.getTextWidth(`${cat.category}: `);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    y = drawWrappedText(
      doc,
      cat.items.join(", "),
      MARGIN + labelWidth,
      y,
      CONTENT_WIDTH - labelWidth,
      3.8,
    );
    y += 2;
  }

  doc.save("Ronan_Prugh_Resume.pdf");
}
