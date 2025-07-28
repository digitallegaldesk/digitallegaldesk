<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // CORS Allow

$api_key = 'sk-abc123xyz456......';  // <-- यहाँ अपनी OpenAI API Key डालें

$data = json_decode(file_get_contents('php://input'), true);

$ch = curl_init('https://api.openai.com/v1/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $api_key
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'model' => 'gpt-3.5-turbo',
    'messages' => $data['messages']
]));

$response = curl_exec($ch);
if (curl_errno($ch)) {
    echo json_encode(['error' => curl_error($ch)]);
} else {
    echo $response;
}
curl_close($ch);
?>
