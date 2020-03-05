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
        />;
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
                if ( !this.graph.edges.some((e: IEdge) =>
                    (vert1  && vert2 && ((e.vertexOne.name === vert1.name
                        && e.vertexTwo.name === vert2.name)
                        ||  (e.vertexOne.name === vert2.name
                            && e.vertexTwo.name === vert1.name))))) {
                    res += 5;
                }
            }
        }
    }
        for (let index = 0; index < graphModel.edges.length; index++) {
            for (let jndex = 0; jndex < graphModel.edges.length; jndex++) {
                console.log(graphModel.edges[index].vertexOne);
                console.log(graphModel.edges[index].vertexTwo);
                console.log(graphModel.edges[index].vertexOne);
                if ((graphModel.edges[index].vertexOne.name !== graphModel.edges[jndex].vertexOne.name &&
                    graphModel.edges[index].vertexOne.name !== graphModel.edges[jndex].vertexTwo.name &&
                    graphModel.edges[index].vertexTwo.name !== graphModel.edges[jndex].vertexOne.name &&
                    graphModel.edges[index].vertexTwo.name !== graphModel.edges[jndex].vertexTwo.name) &&
                    (index < jndex)) {
                    let vert1 = this.graph.vertices.find((v: IVertex) => v.name === graphModel.edges[index].name);
                    let vert2 = this.graph.vertices.find((v: IVertex) => v.name === graphModel.edges[jndex].name);
                   /* if (vert3 && vert4) {
                        console.log(vert3.isAdjacent(vert4));
                    }
                    if (vert1 && vert2 && vert1.isAdjacent(vert2)) {
                        console.log('extra');
                        res += 5;
                    }*/
                       if ( this.graph.edges.some((e: IEdge) =>
                           (vert1  && vert2 && ((e.vertexOne.name === vert1.name
                               && e.vertexTwo.name === vert2.name)
                               ||  (e.vertexOne.name === vert2.name
                               && e.vertexTwo.name === vert1.name))))) {
                           res += 5;
                       }
                }
            }
        }
        if (this.graph.vertices.length !== graphModel.edges.length) {
            for (let vertNum = 0; vertNum < Math.abs(this.graph.vertices.length - graphModel.edges.length); vertNum++) {
                res += 5;
            }
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
