const logger = require('../../utils/logger');
const ErrorResponse = require('../../utils/ErrorResponse');
const puppeteer = require('puppeteer');
const AirfieldSchema = require('../models/Airfield');

const generateAirfieldsPdf = async (req, res) => {
    try {

        const { country } = req.body;

        const airfields = await AirfieldSchema.find({ country: country });

        const tableRows = airfields.map((item, index) => `
            <div class="tbody-record">
                <div class="tbody-data" style="border-right: 1px solid rgb(189, 189, 189);">${index+1}</div>
                <div class="tbody-data" style="border-right: 1px solid rgb(189, 189, 189);">${item.country}</div>
                <div class="tbody-data" style="border-right: 1px solid rgb(189, 189, 189);">${item.airfield_category}</div>
                <div class="tbody-data" style="border-right: 1px solid rgb(189, 189, 189);">${ 
                    item.icao === undefined ? 'N/A' : item.icao
                 }</div>
                <div class="tbody-data" style="border-right: 1px solid rgb(189, 189, 189);">${ 
                    item.iata === undefined ? 'N/A' : item.iata
                 }</div>
                <div class="tbody-data">${ 
                    item.airfield_name === undefined ? 'N/A' : item.airfield_name
                 }</div>
            </div>
        `).join('');

        // Set the HTML content directly
        const htmlContent = `
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        text-decoration: none;
                    }
            
                    .body {
                        padding: 20px 50px;
                        background-color: white;
                    }
            
                    .body .table {
                        width: 100%;
                        min-height: 100vh;
                        border-radius: 0.25rem;
                    }
            
                    .body .table .table-header {
                        width: 100%;
                        background-color: #e4e4e4;
                        display: grid;
                        grid-template-columns: repeat(6, 1fr);
                        padding: 10px;
                        border: 2px solid rgb(189, 189, 189);
                    }
            
                    .body .table .table-header .theader-data {
                        align-items: center;
                        justify-content: center;
                        display: flex;
                        font-family: Arial, Helvetica, sans-serif;
                        font-size: 14px;
                    }
            
                    .body .table .table-body {
                        width: 100%;
                    }
            
                    .body .table .table-body .tbody-record {
                        width: 100%;
                        background-color: #f4f4f4;
                        display: grid;
                        grid-template-columns: repeat(6, 1fr);
                        border-left: 1px solid rgb(189, 189, 189);
                        border-right: 1px solid rgb(189, 189, 189);
                        border-bottom: 1px solid rgb(189, 189, 189);
                    }
            
                    .body .table .table-body .tbody-record .tbody-data {
                        background-color: #f4f4f4;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 10px;
                        padding: 10px 0;
                        font-weight: normal;
                        text-align: center;
                        font-family: Arial, Helvetica, sans-serif;
                    }
                </style>
            </head>
            <body class="body">
                <div class="table">
                    <div class="table-header">
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">No.</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Country</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Category</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">ICAO</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">IATA</div>
                        <div class="theader-data">Airfield</div>
                    </div>
                    <div class="table-body">
                        ${tableRows}
                    </div>
                </div>
            </body>
            </html>
        `;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(htmlContent);

        // Generate the PDF
        const pdfBuffer = await page.pdf({ path: `D:/${country}-Airfields.pdf`, format: 'A4' });

        await browser.close();

        // Set the response headers for PDF download
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="asdfasdf.pdf"',
            'Content-Length': pdfBuffer.length
        });

        // Send the PDF buffer as the response
        res.send(pdfBuffer);

        logger.info("PDF Created Successfully");
        res.status(201).send("Generate PDF query successfull");

    } catch (error) {
        // Log the error before sending any response
        logger.error("Error generating PDF:", error);

        // If the stream hasn't started, send an error response
        if (!res.headersSent) {
            res.status(500).json(
                new ErrorResponse(
                    500,
                    "Generate PDF query failed",
                    error.message
                )
            );
        } else {
            logger.error("Stream error after headers sent, cannot send JSON response.");
        }
    }
}

module.exports = {
    generateAirfieldsPdf
}