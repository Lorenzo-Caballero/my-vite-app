require_once('TextRazor.php');

TextRazorSettings::setApiKey($YOUR_API_KEY);

$text = 'Barclays misled shareholders and the public about one of the biggest investments in the banks history, a BBC Panorama investigation has found.';

$textrazor = new TextRazor();

$textrazor->addExtractor('entities');

$response = $textrazor->analyze($text);
if (isset($response['response']['entities'])) {
    foreach ($response['response']['entities'] as $entity) {
        print($entity['entityId']);
        print(PHP_EOL);
    }
}