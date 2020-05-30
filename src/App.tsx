import React from 'react';
import './App.css';
import {GraphVisualizer, graphModel, Template, Toolbar, ToolButtonList} from 'graphlabs.core.template';
import {IGraph, IVertex, IEdge, GraphGenerator} from 'graphlabs.core.graphs';

class App extends Template {

    graph: IGraph<IVertex, IEdge> = GraphGenerator.generate(0);

    constructor(props: {}) {
        super(props);
        this.calculate = this.calculate.bind(this);
        this.getArea = this.getArea.bind(this);
    }

    public task() {
        return () => <GraphVisualizer
            graph={graphModel}
            namedEdges={true}
        />;
    }

    protected getArea(): React.SFC<{}> {
        return () => <GraphVisualizer
            graph={this.graph}
            adapterType={'writable'}
            namedEdges={true}
            vertexNaming={true}
        />;
    }

    public sort(str: string) {
        return str.replace(/\s+/g, '').toLowerCase().split('').sort().join('');
    }

    public isAnagram(original: string, test: string) {
        return original.trim() === test.trim() ? false : this.sort(original) === this.sort(test);
    }

    public compare(inStr: string, cStr: string) { /* фукнция сравнения двух строк на наличии одинаковых символов */
        let result = inStr.split('').filter(function (letter) {
            return (cStr.indexOf(letter) > -1);
        });
        return result;
    }

    public commonElements(arr: string[]): string {
        let result: string[] = [];
        for (let i = 0; i < (arr.length - 1); i++) { /* перебираем циклом строки из массива */
            result = (i == 0) ? this.compare(arr[i], arr[i + 1]) : this.compare(result.join(''), arr[i + 1]);
        }
        let finalStr = result.join(''); /* преобразуем полученный массив в строку */
        return finalStr;
    }

    public calculate() {
        console.log(graphModel);
        let res = 0;
        for (let index = 0; index < graphModel.edges.length; index++) {
            for (let jndex = 0; jndex < graphModel.edges.length; jndex++) {
                console.log(graphModel.edges[index].vertexOne);
                console.log(graphModel.edges[index].vertexTwo);
                console.log(graphModel.edges[index].vertexOne);
                if ((graphModel.edges[index].vertexOne.name === graphModel.edges[jndex].vertexOne.name ||
                    graphModel.edges[index].vertexOne.name === graphModel.edges[jndex].vertexTwo.name ||
                    graphModel.edges[index].vertexTwo.name === graphModel.edges[jndex].vertexOne.name ||
                    graphModel.edges[index].vertexTwo.name === graphModel.edges[jndex].vertexTwo.name) &&
                    (index < jndex)) {
                    console.log('hh');
                    let vert1 = this.graph.vertices.find((v: IVertex) => v.name === graphModel.edges[index].name);
                    let vert2 = this.graph.vertices.find((v: IVertex) => v.name === graphModel.edges[jndex].name);
                    if (!this.graph.edges.some((e: IEdge) =>
                        (vert1 && vert2 && ((e.vertexOne.name === vert1.name
                            && e.vertexTwo.name === vert2.name)
                            || (e.vertexOne.name === vert2.name
                                && e.vertexTwo.name === vert1.name))))) {
                        console.log('штраф1');
                        res += 5;
                    }
                }
            }
        }
        for (let index = 0; index < graphModel.edges.length; index++) {
            for (let jndex = 0; jndex < graphModel.edges.length; jndex++) {
                if ((graphModel.edges[index].vertexOne.name !== graphModel.edges[jndex].vertexOne.name &&
                    graphModel.edges[index].vertexOne.name !== graphModel.edges[jndex].vertexTwo.name &&
                    graphModel.edges[index].vertexTwo.name !== graphModel.edges[jndex].vertexOne.name &&
                    graphModel.edges[index].vertexTwo.name !== graphModel.edges[jndex].vertexTwo.name) &&
                    (index < jndex)) {
                    let vert1 = this.graph.vertices.find((v: IVertex) => v.name === graphModel.edges[index].name);
                    let vert2 = this.graph.vertices.find((v: IVertex) => v.name === graphModel.edges[jndex].name);
                    if (this.graph.edges.some((e: IEdge) =>
                        (vert1 && vert2 && ((e.vertexOne.name === vert1.name
                            && e.vertexTwo.name === vert2.name)
                            || (e.vertexOne.name === vert2.name
                                && e.vertexTwo.name === vert1.name))))) {
                        res += 5;
                        console.log('штраф2');
                    }
                }
            }
        }
        for (let index = 0; index < this.graph.vertices.length; index++) {
                    let edge = graphModel.edges.find((e: IEdge) => e.name === this.graph.vertices[index].name);
                    if (!edge) {
                        let edge2 = this.graph.edges.find((e: IEdge) => e.vertexOne.name === this.graph.vertices[index].name || e.vertexTwo.name === this.graph.vertices[index].name);
                        if (edge2) {
                            res += 5;
                        }
                        console.log('штраф3');
                    }
        }
        if (this.graph.vertices.length !== graphModel.edges.length) {
            for (let vertNum = 0; vertNum < Math.abs(this.graph.vertices.length - graphModel.edges.length); vertNum++) {
                res += 5;
            }
        }
        let vertices: string[] = [];
        let edges: string[] = [];
        for (let i = 0; i < this.graph.vertices.length; i++) {
            vertices.push(this.graph.vertices[i].name);
        }
        for (let j = 0; j < graphModel.edges.length; j++) {
            edges.push(graphModel.edges[j].name);
        }
        if (!this.isAnagram(vertices.join(''), edges.join('')) && vertices.join('') !== edges.join('')) {
            console.log('штраф4');
            res += 5;
        }
        // tslint:disable-next-line no-console
        // console.log("Штраф " + res);
        return Promise.resolve({success: res === 0, fee: res});
    }

    protected getTaskToolbar() {
        Toolbar.prototype.getButtonList = () => {
            ToolButtonList.prototype.help = () => 'В данном задании вы должны построить реберный граф';
            ToolButtonList.prototype.beforeComplete = this.calculate;
            return ToolButtonList;
        }
        return Toolbar;
    }
}

export default App;
