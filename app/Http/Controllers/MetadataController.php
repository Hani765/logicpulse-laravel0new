<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;

class MetadataController extends Controller
{
    public function fetchMetadata(Request $request)
    {
        $url = $request->query('url');
        if (!$url) {
            return response()->json(['error' => 'URL is required'], 400);
        }

        try {
            $client = new Client();
            $response = $client->get($url);
            $html = $response->getBody()->getContents();

            $crawler = new Crawler($html);
            $metadata = [];

            // Basic fields
            $metadata['title'] = $crawler->filter('title')->count() ? $crawler->filter('title')->text() : 'No title found';
            $metadata['description'] = $crawler->filter('meta[name="description"]')->count() ? $crawler->filter('meta[name="description"]')->attr('content') : 'No description found';
            $metadata['image'] = $crawler->filter('meta[property="og:image"]')->count() ? $crawler->filter('meta[property="og:image"]')->attr('content') : 'No image found';

            // Additional meta fields
            $metadata['keywords'] = $crawler->filter('meta[name="keywords"]')->count() ? $crawler->filter('meta[name="keywords"]')->attr('content') : 'No keywords found';
            return response()->json($metadata);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch metadata', 'message' => $e->getMessage()], 500);
        }
    }
}
