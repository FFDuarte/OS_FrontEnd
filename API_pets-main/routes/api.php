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

    Route::group(['middleware' => ['assign.guard:admin', 'jwt.protected:admin']], function () {
        Route::get('usuarios', [UserAdminController::class, 'index']);
    });
});

/**
 * Rotas usadas pelos tenants
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
            Route::get('/{id_produto}', [ProdutosController::class, 'ObterProduto']);
            Route::post('/', [ProdutosController::class, 'AdicionarProduto']);
            Route::put('/{id_produto}', [ProdutosController::class, 'AtualizarProduto']);
            Route::delete('/{id_produto}', [ProdutosController::class, 'DeletarProduto']);

            Route::prefix('/{id_produto}/foto')->group(function () {
                Route::post('/', [ProdutosFotosController::class, 'AdicionarFoto']);
            });
        });

        /**
         * Vendas
         */
        Route::prefix('/vendas')->group(function () {

            Route::get('/', [VendasController::class, 'ListarVendas']);
            Route::post('/', [VendasController::class, 'AdicionarVenda']);
            Route::put('/{id_venda}', [VendasController::class, 'AtualizarVenda']);
            Route::delete('/{id_venda}', [VendasController::class, 'DeletarVenda']);
        });

        /**
         * Categorais
         */
        Route::prefix('/categorias')->group(function () {

            Route::prefix('/{id_categoria}/foto')->group(function () {
                Route::put('/', [CategoriasFotosController::class, 'AtualizarFoto']);
            });

            Route::get('/', [CategoriasController::class, 'ListarCategorias']);
            Route::get('/{id_categoria}', [CategoriasController::class, 'ObterCategoria']);
            Route::post('/', [CategoriasController::class, 'AdicionarCategoria']);
            Route::put('/{id_categoria}', [CategoriasController::class, 'AtualizarCategoria']);
            Route::delete('/{id_categoria}', [CategoriasController::class, 'DeletarCategoria']);
        });
    });
});



/**
 * Rotas usadas pelo app
 */
Route::group([
    'prefix' => '/',
], function () {

    Route::post('/login',  [AuthAppController::class, 'Login']);
    Route::post('/registrar', [AuthAppController::class, 'Registrar']);

    Route::group(['middleware' => ['assign.guard:app', 'jwt.protected:app']], function () {

        Route::prefix('/usuarios')->group(function () {

            Route::get('/', [UserAppController::class, 'index']);

            /**
             * Endereços do usuário
             */
            Route::prefix('/{id_usuario}/enderecos')->group(function () {

                Route::get('/', [UsuariosEnderecosController::class, 'ListarEnderecos']);
                Route::get('/{id_endereco}', [UsuariosEnderecosController::class, 'ObterUsuarioEndereco']);
                Route::post('/', [UsuariosEnderecosController::class, 'AdicionarUsuarioEndereco']);
                Route::put('/{id_endereco}', [UsuariosEnderecosController::class, 'AtualizarUsuarioEndereco']);
                Route::delete('/{id_endereco}', [UsuariosEnderecosController::class, 'ApagarUsuarioEndereco']);
            });
        });
    });


    /**
     * Listagem de lojistas que vão aparecer no app
     */
    Route::get('lojistas', [LojistasController::class, 'ListarTodos']);

    /**
     * Rotas podem ser acessadas apenas por (tenant) inquilinos logados
     */
    Route::group([
        'prefix' => '/{tenant}',
        'middleware' => [InitializeTenancyByPath::class],
    ], function () {



        /**
         * Produtos
         */
        Route::prefix('/produtos')->group(function () {

            Route::get('/', [ProdutosController::class, 'ListarTodos']);
            Route::get('/{id_produto}', [ProdutosController::class, 'ObterProduto']);
        });

        /**
         * Categorais
         */
        Route::prefix('/categorias')->group(function () {

            Route::get('/', [CategoriasController::class, 'ListarCategorias']);
            Route::get('/{id_categoria}', [CategoriasController::class, 'ObterCategoria']);
        });
    });
});
