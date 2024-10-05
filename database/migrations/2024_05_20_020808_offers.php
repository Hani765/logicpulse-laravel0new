<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            $table->string('user_id')->index();
            $table->string('unique_id')->index();
            $table->string('offer_name')->index();
            $table->string('image')->index();
            $table->string('network_id')->index();
            $table->string('domain_id')->index();
            $table->string('category_id')->index();
            $table->string('age')->nullable();
            $table->string('rate')->nullable();
            $table->string('encryption')->nullable();
            $table->text('urls');
            $table->longText('details')->nullable();
            $table->longText('countries')->nullable();
            $table->string('proxy');
            $table->string('status')->index();
            $table->timestamps();

            // Adding foreign key constraint
            $table->foreign('user_id')->references('unique_id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('offers', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });

        Schema::dropIfExists('offers');
    }
};