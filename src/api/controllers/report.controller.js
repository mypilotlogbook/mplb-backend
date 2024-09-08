const logger = require('../../utils/logger');
const ErrorResponse = require('../../utils/ErrorResponse');
const puppeteer = require('puppeteer');
const AirfieldSchema = require('../models/Airfield');
const PilotSchema = require('../models/Pilot');
const AircraftSchema = require('../models/Aircraft');
const FlightSchema = require('../models/Flight');
const os = require('os');
const path = require('path');

// Get the desktop directory path dynamically
const desktopPath = path.join(os.homedir(), 'Desktop');

const generateSelectedAirfieldsPdf = async (req, res) => {
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

        const date = new Date();
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        // Generate the PDF
        const pdfBuffer = await page.pdf({ path: `${desktopPath}/${country}-Airfields ${formattedDate}.pdf`, format: 'A4' });
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

const generateAllAirfieldsPdf = async (req, res) => {
    try {

        const airfields = await AirfieldSchema.find();

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

        const date = new Date();
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        // Generate the PDF
        const pdfBuffer = await page.pdf({ path: `${desktopPath}/Airfields ${formattedDate}.pdf`, format: 'A4' });

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

const generateAllPilotsPdf = async (req, res) => {
    try {
        const { userId } = req.body;
        const pilots = await PilotSchema.find({ userId: userId });

        const tableRows = pilots.map((item, index) => `
            <div class="tbody-record">
                <div class="tbody-data">${index+1}</div>
                <div class="tbody-data">${item.fname} ${item.lname}</div>
                <div class="tbody-data">${ 
                    item.email === undefined ? 'N/A' : item.email
                 }</div>
                <div class="tbody-data">${ 
                    item.mobile === undefined ? 'N/A' : item.mobile
                 }</div>
                <div class="tbody-data">${ 
                    item.employee_id === undefined ? 'N/A' : item.employee_id
                 }</div>
                <div class="tbody-data">${ 
                    item.company === undefined ? 'N/A' : item.company
                 }</div>
                <div class="tbody-data">${ 
                    item.position === undefined ? 'N/A' : item.position
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
                        grid-template-columns: repeat(7, 1fr);
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
                        grid-template-columns: repeat(7, 1fr);
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
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Name</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Email</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Mobile</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Employee ID</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Company</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Position</div>
                    </div>
                    <div class="table-body">
                        ${tableRows}
                    </div>
                </div>
            </body>
            </html>
        `;

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.setContent(htmlContent);

        const date = new Date();
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        // Generate the PDF
        const pdfBuffer = await page.pdf({ path: `${desktopPath}/AllPilots ${formattedDate}.pdf`, format: 'A4' });

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
        logger.error("Error generating PDF:", error.message);

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

const generateSelectedPilotsPdf = async (req, res) => {
    try {
        const { pilotsList } = req.body;

        const tableRows = pilotsList.map((item, index) => `
            <div class="tbody-record">
                <div class="tbody-data">${index+1}</div>
                <div class="tbody-data">${item.fname} ${item.lname}</div>
                <div class="tbody-data">${ 
                    item.email === undefined ? 'N/A' : item.email
                 }</div>
                <div class="tbody-data">${ 
                    item.mobile === undefined ? 'N/A' : item.mobile
                 }</div>
                <div class="tbody-data">${ 
                    item.employee_id === undefined ? 'N/A' : item.employee_id
                 }</div>
                <div class="tbody-data">${ 
                    item.company === undefined ? 'N/A' : item.company
                 }</div>
                <div class="tbody-data">${ 
                    item.position === undefined ? 'N/A' : item.position
                 }</div>
            </div>
        `).join('');

        console.log(tableRows);

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
                        grid-template-columns: repeat(7, 1fr);
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
                        grid-template-columns: repeat(7, 1fr);
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
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Name</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Email</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Mobile</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Employee ID</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Company</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Position</div>
                    </div>
                    <div class="table-body">
                        ${tableRows}
                    </div>
                </div>
            </body>
            </html>
        `;

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.setContent(htmlContent);

        const date = new Date();
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        // Generate the PDF
        const pdfBuffer = await page.pdf({ path: `${desktopPath}/SelectedPilots ${formattedDate}.pdf`, format: 'A4' });

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
        logger.error("Error generating PDF:", error.message);

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

const generateAllAircraftsPdf = async (req, res) => {
    try {
        const { userId } = req.body;
        const aircrafts = await AircraftSchema.find({ userId: userId });

        const tableRows = aircrafts.map((item, index) => `
            <div class="tbody-record">
                <div class="tbody-data">${index+1}</div>
                <div class="tbody-data">${item.type}</div>
                <div class="tbody-data">${ 
                    item.manufacturer === undefined ? 'N/A' : item.manufacturer
                 }</div>
                <div class="tbody-data">${ 
                    item.model === undefined ? 'N/A' : item.model
                 }</div>
                <div class="tbody-data">${ 
                    item.aircraft_class === undefined ? 'N/A' : item.aircraft_class
                 }</div>
                <div class="tbody-data">${ 
                    item.category === undefined ? 'N/A' : item.category
                 }</div>
                <div class="tbody-data">${ 
                    item.registration_no === undefined ? 'N/A' : item.registration_no
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
                        grid-template-columns: repeat(7, 1fr);
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
                        grid-template-columns: repeat(7, 1fr);
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
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Type</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Manufacturer</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Model - Varient</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Class ID</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Category</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Registration No.</div>
                    </div>
                    <div class="table-body">
                        ${tableRows}
                    </div>
                </div>
            </body>
            </html>
        `;

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.setContent(htmlContent);

        const date = new Date();
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        // Generate the PDF
        const pdfBuffer = await page.pdf({ path: `${desktopPath}/AllAircrafts ${formattedDate}.pdf`, format: 'A4' });

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
        logger.error("Error generating PDF:", error.message);

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

const generateSelectedAircraftsPdf = async (req, res) => {
    try {
        const { aircraftsList } = req.body;

        const tableRows = aircraftsList.map((item, index) => `
            <div class="tbody-record">
                <div class="tbody-data">${index+1}</div>
                <div class="tbody-data">${item.type}</div>
                <div class="tbody-data">${ 
                    item.manufacturer === undefined ? 'N/A' : item.manufacturer
                 }</div>
                <div class="tbody-data">${ 
                    item.model === undefined ? 'N/A' : item.model
                 }</div>
                <div class="tbody-data">${ 
                    item.aircraft_class === undefined ? 'N/A' : item.aircraft_class
                 }</div>
                <div class="tbody-data">${ 
                    item.category === undefined ? 'N/A' : item.category
                 }</div>
                <div class="tbody-data">${ 
                    item.registration_no === undefined ? 'N/A' : item.registration_no
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
                        grid-template-columns: repeat(7, 1fr);
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
                        grid-template-columns: repeat(7, 1fr);
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
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Type</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Manufacturer</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Model - Varient</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Class ID</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Category</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Registration No.</div>
                    </div>
                    <div class="table-body">
                        ${tableRows}
                    </div>
                </div>
            </body>
            </html>
        `;

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.setContent(htmlContent);

        const date = new Date();
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        // Generate the PDF
        const pdfBuffer = await page.pdf({ path: `${desktopPath}/SelectedAircrafts ${formattedDate}.pdf`, format: 'A4' });

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
        logger.error("Error generating PDF:", error.message);

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

const generateAllFlightsPdf = async (req, res) => {
    try {
        const { userId } = req.body;
        const flights = await FlightSchema.find({ userId: userId })
            .populate('departure')
            .populate('arrival')
            .populate('aircraft')
            .exec();

        const tableRows = flights.map((item, index) => `
            <div class="tbody-record">
                <div class="tbody-data">${index+1}</div>
                <div class="tbody-data">${item.date.toUTCString()}</div>
                <div class="tbody-data">${ 
                    item.aircraft.registration_no === undefined ? 'N/A' : item.aircraft.registration_no
                 }</div>
                <div class="tbody-data">${ 
                    item.arrival.airport_name === undefined ? 'N/A' : item.arrival.airport_name
                 }</div>
                <div class="tbody-data">${ 
                    item.departure.airport_name === undefined ? 'N/A' : item.departure.airport_name
                 }</div>
                <div class="tbody-data">${ 
                    item.in_time === undefined ? 'N/A' : item.in_time
                 }</div>
                <div class="tbody-data">${ 
                    item.out_time === undefined ? 'N/A' : item.out_time
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
                        grid-template-columns: repeat(7, 1fr);
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
                        grid-template-columns: repeat(7, 1fr);
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
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Date</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Flight No.</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Arrival</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Departure</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">In</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Out</div>
                    </div>
                    <div class="table-body">
                        ${tableRows}
                    </div>
                </div>
            </body>
            </html>
        `;

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.setContent(htmlContent);

        const date = new Date();
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        // Generate the PDF
        const pdfBuffer = await page.pdf({ path: `${desktopPath}/AllFlights ${formattedDate}.pdf`, format: 'A4' });

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
        logger.error("Error generating PDF:", error.message);

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

const generateSelectedFlightsPdf = async (req, res) => {
    try {
        const { flightsList } = req.body;
        console.log(flightsList);

        const tableRows = flightsList.map((item, index) => `
            <div class="tbody-record">
                <div class="tbody-data">${index+1}</div>
                <div class="tbody-data">${item.date}</div>
                <div class="tbody-data">${ 
                    item.aircraft.registration_no === undefined ? 'N/A' : item.aircraft.registration_no
                 }</div>
                <div class="tbody-data">${ 
                    item.arrival.airport_name === undefined ? 'N/A' : item.arrival.airport_name
                 }</div>
                <div class="tbody-data">${ 
                    item.departure.airport_name === undefined ? 'N/A' : item.departure.airport_name
                 }</div>
                <div class="tbody-data">${ 
                    item.in_time === undefined ? 'N/A' : item.in_time
                 }</div>
                <div class="tbody-data">${ 
                    item.out_time === undefined ? 'N/A' : item.out_time
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
                        grid-template-columns: repeat(7, 1fr);
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
                        grid-template-columns: repeat(7, 1fr);
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
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Date</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Flight No.</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Arrival</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Departure</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">In</div>
                        <div class="theader-data" style="border-right: 2px solid rgb(189, 189, 189);">Out</div>
                    </div>
                    <div class="table-body">
                        ${tableRows}
                    </div>
                </div>
            </body>
            </html>
        `;

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.setContent(htmlContent);

        const date = new Date();
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        // Generate the PDF
        const pdfBuffer = await page.pdf({ path: `${desktopPath}/SelectedFlights ${formattedDate}.pdf`, format: 'A4' });

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
        logger.error("Error generating PDF:", error.message);

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
    generateAllAirfieldsPdf,
    generateSelectedAirfieldsPdf,
    generateAllPilotsPdf,
    generateSelectedPilotsPdf,
    generateAllAircraftsPdf,
    generateSelectedAircraftsPdf,
    generateAllFlightsPdf,
    generateSelectedFlightsPdf
}