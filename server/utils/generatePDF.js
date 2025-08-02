import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import { fileURLToPath } from "url";
import { dirname } from "path";

import addHeader from "./components/addHeader.js";
import addFooter from "./components/addFooter.js";
import addCoverPage from "./components/addCoverPage.js";
import addIntroLetter from "./components/addIntroLetter.js";
import addAnnexure1 from "./components/annexure1/addAnnexure1.js";
import addAnnexure2 from "./components/annexure2/addAnnexure2.js";
import addAnnexure3 from "./components/annexure3/addAnnexure3.js";
import addAnnexure4 from "./components/annexure4/addAnnexure4.js";
import addAnnexure5 from "./components/annexure5/addAnnexure5.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generatePDF = async (data) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, "./quotation.pdf");
    const doc = new PDFDocument({ size: "A4", margin: 50, bufferPages: true });

    doc.registerFont(
      "calibri",
      path.join(__dirname, "./assets/fonts/CALIBRI.TTF")
    );
    doc.registerFont(
      "calibri-bold",
      path.join(__dirname, "./assets/fonts/CALIBRIB.TTF")
    );
    doc.registerFont(
      "outfit",
      path.join(__dirname, "./assets/fonts/Outfit-Bold.ttf")
    );

    doc.font("calibri");
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    let logicalPage = 0;
    doc.on("pageAdded", () => {
      logicalPage++;
      if (logicalPage === 1) addHeader(doc, data, "logo");
      else addHeader(doc, data, "default");
    });
    // console.log("generatePDF : ", data);
    addCoverPage(doc, data);
    addIntroLetter(doc, data);
    addAnnexure1(doc, data);
    addAnnexure2(doc, data);
    addAnnexure3(doc, data);
    addAnnexure4(doc, data);
    addAnnexure5(doc, data);
    addFooter(doc);

    doc.end();

    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
};

export default generatePDF;
