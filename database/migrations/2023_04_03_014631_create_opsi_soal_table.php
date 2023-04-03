<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('question options', function (Blueprint $table) {
            $table->id('id');
            $table->text('Deskripsi_Opsi');
            $table->enum('Tipe_opsi', ['Benar', 'Salah']);
            $table->timestamps();
            $table->unsignedBigInteger('ID_Soal');

            $table->foreign('ID_Soal')->references('id')->on('questions')->onDelete('cascade');

            $table->index('id','id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('komentar_opsi_soal');
    }
};