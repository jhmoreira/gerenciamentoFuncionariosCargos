import React, { Component } from 'react'
import axios from 'axios'
import Main from '../view/Main' 
import cargos from '../../backend/db.json'


const headerProps = {
    icone: 'users',
    title: 'Funcionários',
    subtitulo: 'Gestão de Usuários: Incluir, Exibir, Modificar e Deletar'

}

const baseUrl = "http://localhost:3001/funcionario"
const estadoInicial = {
    funcionario: {
        nome: "",
        sobrenome: "",
        cargo: "",
        ddtNascimento: "",
        salario: ""

    },
    list: []
}



export default class Funcionario extends Component {
    state = { ...estadoInicial }
    
    componentDidMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }
    limpar() {
        this.setState({ funcionario: estadoInicial.funcionario })
    }
    cadastrar() {
        const funcionario = this.state.funcionario
        const metodo = funcionario.id ? 'put' : 'post'
        const url = funcionario.id ? `${baseUrl}/${funcionario.id}` : baseUrl
        axios[metodo](url, funcionario)
            .then(resp => {
                const list = this.atualizarLista(resp.data)
                this.setState({
                    funcionario: estadoInicial.funcionario, list
                })

            })
    }
    atualizarLista(funcionario, add=true) {
        const list = this.state.list.filter(u => u.id !== funcionario.id)
        if (add) list.unshift(funcionario)
        return list
    }
    atualizarCampos(event) {
        const funcionario = { ...this.state.funcionario }
        funcionario[event.target.name] = event.target.value
        this.setState({ funcionario })
    }
    formulario() {
               return (
            
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label >Nome</label>
                            <input type="text" className="form-control"  name="nome" value={this.state.funcionario.nome} onChange={e => this.atualizarCampos(e)}
                                placeholder="Digite o nome" />

                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label >Sobrenome</label>
                            <input type="text" className="form-control" name="sobrenome" value={this.state.funcionario.sobrenome} onChange={e => this.atualizarCampos(e)}
                                placeholder="Digite o nome" />

                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label >Cargo</label>
                            <select type="text" id="cargo" className="form-control" required name="Cargo" value={this.state.funcionario.Cargo} onChange={e => this.atualizarCampos(e)}
                                placeholder="Escolha o cargo" >
                                    {cargos.cargos.map(cargos=>(
                                        <option key={cargos.id} value={cargos.nome}>
                                               
                                                {cargos.nome}
                                                

                                        </option>
                                        
                                    ))}
                                </select>

                           
               

                        </div>
                    </div>
                    <div className="col-12 col-md-6">

                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label >Data de Nascimento</label>
                            <input type="date" className="form-control" name="ddtNascimento" value={this.state.funcionario.ddtNascimento} onChange={e => this.atualizarCampos(e)}
                                placeholder="Digite a data de Nascimento" />

                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label >Salário</label> 
                         <input type="number" className="form-control" name="salario" value={this.state.funcionario.salario} onChange={e => this.atualizarCampos(e)}
                                placeholder="Digite o Salario" />

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

    carregar(funcionario) {
        this.setState({ funcionario })
    }
    deletar(funcionario) {
        axios.delete(`${baseUrl}/${funcionario.id}`).then(resp => {
            const list = this.atualizarLista(funcionario,false)
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
                        <th>Sobrenome</th>
                        <th>Cargo</th>
                        <th>Data de Nascimento</th>
                        <th>Salário</th>
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
        return this.state.list.map(funcionario => {
            return(
                <tr key={funcionario.id}>
                    <td>{funcionario.id}</td>
                    <td>{funcionario.nome}</td>
                    <td>{funcionario.sobrenome}</td>
                    <td>{funcionario.Cargo}</td>
                    <td>{funcionario.ddtNascimento}</td>
                    <td>{funcionario.salario}</td>
                    <td><button className="btn btn-warning">
                        <i className="fa fa-pencil" onClick={()=>this.carregar(funcionario)}>

                        </i>
                    </button>
                        <button className="btn btn-danger ml-2">
                            <i className="fa fa-trash"onClick={()=>this.deletar(funcionario)}>

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




