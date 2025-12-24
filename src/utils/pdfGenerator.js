// src/utils/pdfGenerator.js
import { jsPDF } from 'jspdf';
import { getServiceById, calculateModuleCost } from './pricingEngine.js';
import { LEVELS } from '../data/pricingData.js';

export const generateSystemPDF = (data, shouldDownload = false) => {
    // data structure: { contact: {}, system: { totalCost, efficiencyScore, efficiencyLabel, modules } }
    const doc = new jsPDF();
    const { contact, system } = data;

    // --- Header ---
    doc.setFillColor(18, 18, 18); // Dark background mostly for header
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("Social Samsara", 20, 18);

    doc.setFontSize(10);
    doc.setTextColor(200, 200, 200);
    doc.text("Growth System Configuration", 20, 26);

    doc.setFontSize(10);
    doc.text(new Date().toLocaleDateString(), 180, 20, { align: 'right' });

    // --- Client Details ---
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Prepared For:", 20, 55);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Name: ${contact.name}`, 20, 62);
    doc.text(`Company: ${contact.company || '-'}`, 20, 68);
    doc.text(`Email: ${contact.email}`, 20, 74);

    // --- System Summary ---
    doc.setFont("helvetica", "bold");
    doc.text("System Summary:", 110, 55);

    doc.setFont("helvetica", "normal");
    doc.text(`Total Monthly Investment: Rs. ${system.totalCost.toLocaleString('en-IN')}`, 110, 62);
    doc.text(`Efficiency Score: ${system.efficiencyScore}% (${system.efficiencyLabel})`, 110, 68);
    doc.text(`Modules Active: ${Object.keys(system.modules).length}`, 110, 74);

    // --- Divider 1 ---
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 85, 190, 85);

    // --- Brand Context ---
    const { context } = data;
    if (context) {
        let contextY = 100;
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Brand Context", 20, contextY);

        contextY += 10;
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");

        // Define labels for the keys we expect
        const contextLabels = {
            growth_stage: "Business Stage",
            focus: "Primary Focus",
            work_style: "Work Preference"
        };

        const contextKeys = Object.keys(context);
        let col = 0;

        contextKeys.forEach((key, index) => {
            // Simple grid layout for context
            const xPos = 20 + (col * 60);
            const label = contextLabels[key] || key.charAt(0).toUpperCase() + key.slice(1);
            const value = context[key] ? context[key].charAt(0).toUpperCase() + context[key].slice(1) : '-'; // Capitalize value

            doc.setFont("helvetica", "bold");
            doc.text(label, xPos, contextY);
            doc.setFont("helvetica", "normal");
            doc.text(value, xPos, contextY + 6);

            col++;
        });
    }

    // --- Divider 2 ---
    doc.line(20, 125, 190, 125);

    // --- Modules Table ---
    let yPos = 140; // Shifted down
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Selected Modules", 20, yPos);

    yPos += 15;

    // Table Header
    doc.setFontSize(10);
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPos - 5, 170, 8, 'F');
    doc.text("Service", 25, yPos);
    doc.text("Level", 90, yPos);
    doc.text("Quantity", 130, yPos);
    doc.text("Cost", 170, yPos);

    yPos += 10;
    doc.setFont("helvetica", "normal");

    Object.entries(system.modules).forEach(([serviceId, levelKey]) => {
        const service = getServiceById(serviceId);
        if (!service) return;

        const details = calculateModuleCost(serviceId, levelKey);
        const levelName = LEVELS[levelKey]?.label || levelKey;

        // Draw Row
        doc.text(service.name, 25, yPos);
        doc.text(levelName, 90, yPos);
        doc.text(`${details.quantity} ${service.unit}s`, 130, yPos);
        doc.text(`Rs. ${details.cost.toLocaleString('en-IN')}`, 170, yPos);

        yPos += 10;

        // Page break check
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }
    });

    // --- Footer ---
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("This document is an estimate based on your configuration. Final pricing subject to detailed scoping.", 105, 285, { align: 'center' });
    doc.text("samsara@exetera.in", 105, 290, { align: 'center' });

    if (shouldDownload) {
        doc.save(`Social_Samsara_System_${contact.name.replace(/\s+/g, '_')}.pdf`);
    }

    return doc.output('blob'); // Return for email attachment
};
