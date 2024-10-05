<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Domain;
use App\Models\Network;
use Illuminate\Support\Str;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Offers>
 */
class OffersFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        // Ensure you have at least one user in the database to reference
        $user = User::inRandomOrder()->first();
        $networkId = Network::inRandomOrder()->value('unique_id');
        $domainId = Domain::inRandomOrder()->value('unique_id');
        $domainId = Category::inRandomOrder()->value('unique_id');

        return [
            'user_id' => '40bcfd78-a7d9-4eb0-8fa6-4bb67a1546db',
            'unique_id' => Str::uuid()->toString(),
            'offer_name' => $this->faker->words(3, true),
            // 'platform_name' => $this->faker->words(2, true),
            'network_id' => $networkId,
            'domain_id' => $domainId,
            'category_id' => $domainId,
            'age' => $this->faker->numberBetween(18, 65),
            'rate' => $this->faker->randomFloat(2, 0, 100),
            'encryption' => $this->faker->word,
            'urls' => $this->faker->url,
            'image' => $this->faker->url,
            'details' => $this->faker->paragraph,
            'countries' => $this->faker->country,
            'proxy' => $this->faker->word,
            'status' => $this->faker->randomElement(['active', 'inactive']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
