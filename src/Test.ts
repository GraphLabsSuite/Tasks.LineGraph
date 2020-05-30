import {graphModel} from "graphlabs.core.template";
import {IGraph, IEdge, IVertex} from "graphlabs.core.graphs";

export class Test {

    public constructor() {

    }

    public calculate(graphModel: IGraph<IVertex, IEdge>, graph: IGraph<IVertex, IEdge>) {
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
                    let vert1 = graph.vertices.find((v: IVertex) => v.name === graphModel.edges[index].name);
                    let vert2 = graph.vertices.find((v: IVertex) => v.name === graphModel.edges[jndex].name);
                    if ( !graph.edges.some((e: IEdge) =>
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
                    let vert1 = graph.vertices.find((v: IVertex) => v.name === graphModel.edges[index].name);
                    let vert2 = graph.vertices.find((v: IVertex) => v.name === graphModel.edges[jndex].name);
                    /* if (vert3 && vert4) {
                         console.log(vert3.isAdjacent(vert4));
                     }
                     if (vert1 && vert2 && vert1.isAdjacent(vert2)) {
                         console.log('extra');
                         res += 5;
                     }*/
                    if ( graph.edges.some((e: IEdge) =>
                        (vert1  && vert2 && ((e.vertexOne.name === vert1.name
                            && e.vertexTwo.name === vert2.name)
                            ||  (e.vertexOne.name === vert2.name
                                && e.vertexTwo.name === vert1.name))))) {
                        res += 5;
                    }
                }
            }
        }
        if (graph.vertices.length !== graphModel.edges.length) {
            for (let vertNum = 0; vertNum < Math.abs(graph.vertices.length - graphModel.edges.length); vertNum++) {
                res += 5;
            }
        }
        // tslint:disable-next-line no-console
        // console.log("Штраф " + res);
        return res;
    }
}