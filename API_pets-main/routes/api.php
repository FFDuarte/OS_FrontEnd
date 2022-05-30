<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByPath;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


/**
 * Rotas usadas pelos admins do sistema
 */
Route::group([
    'prefix' => '/admin',
], function () {
    Route::post('/login',  [AuthAdminController::class, 'Login']);
    Route::post('/registrar', [AuthAdminController::class, 'Registrar']);
    Route::post('/logout',  [AuthAdminController::class, 'Logout']);
    Route::post('/refresh', [AuthAdminController::class, 'Refresh']);

    Route::group(['middleware' => ['assign.guard:admin', 'jwt.protected:admin']], function () {
        Route::get('usuarios', [UserAdminController::class, 'index']);
    });
});

/**
 * Rotas usadas pelos inquilinos
 */
Route::group([
    'prefix' => '/dashboard',
], function () {

    Route::post('/login',  [AuthTenantController::class, 'Login']);
    Route::post('/registrar', [AuthTenantController::class, 'Registrar']);
});



/**
 * Rotas podem ser acessadas apenas por (tenant) inquilinos logados
 */
Route::group([
    'prefix' => '/dashboard/{tenant}',
    'middleware' => [InitializeTenancyByPath::class],
], function () {

    Route::group(['middleware' => ['assign.guard:tenant', 'jwt.protected:tenant']], function () {

        /**
         * Usuários
         */
        Route::prefix('/usuarios')->group(function () {
            Route::get('/', [UserTenantController::class, 'index']);
        });


        /**
         * Produtos
         */
        Route::prefix('/produtos')->group(function () {

            Route::get('/', [ProdutosController::class, 'ListarTodos']);
            Route::post('/', [ProdutosController::class, 'AdicionarProduto']);
            Route::put('/{id_produto}', [ProdutosController::class, 'AtualizarProduto']);
            Route::delete('/{id_produto}', [ProdutosController::class, 'DeletarProduto']);

            Route::prefix('/{id_produto}/foto')->group( function () {
                Route::post('/', [ProdutosFotosController::class,'AdicionarFoto']);
            });

        });
    });
});



/**
 * Rotas usadas pelo app
 */
// Route::group([
//     'prefix' => '/',
// ], function () {

//     Route::post('/login',  [AuthAppController::class, 'Login']);
//     Route::post('/registrar', [AuthAppController::class, 'Registrar']);

//     Route::group(['middleware' => ['assign.guard:app', 'jwt.protected:app']], function () {
//         Route::get('usuarios', [UserAppController::class, 'index']);
//     });
// });
