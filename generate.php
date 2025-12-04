<?php

// Set the content type of the response to HTML
header('Content-Type: text/html; charset=utf-8');

$webhookUrl = getenv('N8N_WEBHOOK_URL');
if (!$webhookUrl) {
    if (file_exists('config.local.php')) {
        $webhookUrl = require 'config.local.php';
    }
}

if (!$webhookUrl) {
    http_response_code(500);
    echo "Configuration error: Webhook URL is not set on the server.";
    exit;
}

$clientData = file_get_contents('php://input');

$ch = curl_init($webhookUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $clientData);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: text/plain',
    'Content-Length: ' . strlen($clientData)
]);

$response = curl_exec($ch);

// Check for cURL errors (e.g., network issues, DNS failures)
if ($response === false) {
    http_response_code(502); // Bad Gateway
    echo "Proxy error: Could not connect to the AI service. Details: " . curl_error($ch);
    curl_close($ch);
    exit;
}

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode);
echo $response;