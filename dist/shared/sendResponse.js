"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, jsonData) => {
    res.status(jsonData.statusCode).json(Object.assign({ success: jsonData.success, status: jsonData.statusCode, message: jsonData.message }, (jsonData.data && { data: jsonData.data })));
};
exports.default = sendResponse;
