import { Categoria } from "./Categoria";
import { Usuario } from "./Usuario";

export class Produto{

    public id: number;
    public nome: string;
    public descricao: string;
    public preco: number;
    public estoque: number;
    public foto: string;
    public tipoProduto: string;
    public categoria: Categoria;
    public usuario: Usuario;

}