import React, { Component } from 'react'
import axios from 'axios'
import Main from '../view/Main' 


const headerProps = {
    icone: 'users',
    title: 'Cargo',
    subtitulo: 'Gestão de Cargos: Incluir, Exibir, Modificar e Deletar'

}

const baseUrl = "http://localhost:3001/cargos"
const estadoInicial = {
    cargo: {
        nome: "",
        descricao: "",
       
    },
    list: []
}



export default class Cargo extends Component {
    state = { ...estadoInicial }
    componentDidMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }
    limpar() {
        this.setState({ cargo: estadoInicial.cargo })
    }
    cadastrar() {
        const cargo = this.state.cargo
        const metodo = cargo.id ? 'put' : 'post'
        const url = cargo.id ? `${baseUrl}/${cargo.id}` : baseUrl
        axios[metodo](url, cargo)
            .then(resp => {
                const list = this.atualizarLista(resp.data)
                this.setState({
                    cargo: estadoInicial.cargo, list
                })

            })
    }
    atualizarLista(cargo, add=true) {
        const list = this.state.list.filter(u => u.id !== cargo.id)
        if (add) list.unshift(cargo)
        return list
    }
    atualizarCampos(event) {
        const cargo = { ...this.state.cargo }
        cargo[event.target.name] = event.target.value
        this.setState({ cargo })
    }
    formulario() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label >Nome</label>
                            <input type="text" className="form-control" name="nome" value={this.state.cargo.nome} onChange={e => this.atualizarCampos(e)}
                                placeholder="Digite o nome" />

                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label >Descrição</label>
                            <textarea type="text" className="form-control" name="descricao" value={this.state.cargo.descricao} onChange={e => this.atualizarCampos(e)}
                                placeholder="Digite o nome" />

                        </div>
                    </div>
                    



                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.cadastrar(e)}>
                            Salvar
                        </button>
                        <button className="btn-btn-secondary ml-12" onClick={e => this.limpar(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>

            </div>


        )
    }

    carregar(cargo) {
        this.setState({ cargo })
    }
    deletar(cargo) {
        axios.delete(`${baseUrl}/${cargo.id}`).then(resp => {
            const list = this.atualizarLista(cargo,false)
            this.setState({ list })
        })

    }

    mostrarTabela() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                         <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.mostrarLinha()}
                </tbody>
            </table>
        )
    }

    mostrarLinha() {
        return this.state.list.map(cargo => {
            return(
                <tr key={cargo.id}>
                    <td>{cargo.id}</td>
                    <td>{cargo.nome}</td>
                    <td>{cargo.descricao}</td>
                
                    <td><button className="btn btn-warning">
                        <i className="fa fa-pencil" onClick={()=>this.carregar(cargo)}>

                        </i>
                    </button>
                        <button className="btn btn-danger ml-2">
                            <i className="fa fa-trash"onClick={()=>this.deletar(cargo)}>

                            </i>
                        </button>

                    </td>

                </tr>
        )}
        )
    }
    render() {

        return (

            <Main {...headerProps}>
                {this.formulario()}
                {this.mostrarTabela()}

            </Main>
        )
    }
}




