import {Test} from "../src/Test";
import {IGraph, IVertex, IEdge, Graph, Vertex, Edge} from "graphlabs.core.graphs";
import * as chai from 'chai';

describe('calculate', () => {
    let test = new Test();
    let testModel1: IGraph<IVertex, IEdge> = new Graph() as unknown as IGraph<IVertex, IEdge>;
    testModel1.addVertex(new Vertex('1'));
    testModel1.addVertex(new Vertex('2'));
    testModel1.addVertex(new Vertex('3'));
    testModel1.addVertex(new Vertex('4'));
    testModel1.addEdge(new Edge(new Vertex('1'), new Vertex('2'), '1'));
    testModel1.addEdge(new Edge(new Vertex('2'), new Vertex('3'), '2'));
    testModel1.addEdge(new Edge(new Vertex('3'), new Vertex('1'), '3'));
    testModel1.addEdge(new Edge(new Vertex('3'), new Vertex('4'), '4'));
    describe('lack of vertices', () => {
        let testGraph1: IGraph<IVertex, IEdge> = new Graph() as unknown as IGraph<IVertex, IEdge>;
        testGraph1.addVertex(new Vertex('1'));
        testGraph1.addVertex(new Vertex('2'));
        testGraph1.addVertex(new Vertex('3'));
        testGraph1.addEdge(new Edge(new Vertex('1'), new Vertex('2')));
        testGraph1.addEdge(new Edge(new Vertex('2'), new Vertex('3')));
        testGraph1.addEdge(new Edge(new Vertex('3'), new Vertex('1')));
        it('test case 1', () => {
            chai.assert(test.calculate(testModel1, testGraph1) == 5);
        })
    })
    describe('another vertices', () => {
        let testGraph1: IGraph<IVertex, IEdge> = new Graph() as unknown as IGraph<IVertex, IEdge>;
        testGraph1.addVertex(new Vertex('1'));
        testGraph1.addVertex(new Vertex('2'));
        testGraph1.addVertex(new Vertex('3'));
        testGraph1.addVertex(new Vertex('5'));
        testGraph1.addEdge(new Edge(new Vertex('1'), new Vertex('2')));
        testGraph1.addEdge(new Edge(new Vertex('2'), new Vertex('3')));
        testGraph1.addEdge(new Edge(new Vertex('3'), new Vertex('1')));
        testGraph1.addEdge(new Edge(new Vertex('3'), new Vertex('5')));
        testGraph1.addEdge(new Edge(new Vertex('2'), new Vertex('5')));
        it('test case 1', () => {
            chai.assert(test.calculate(testModel1, testGraph1) == 5);
        })
    })
    describe('extra vertices', () => {
        let testGraph1: IGraph<IVertex, IEdge> = new Graph() as unknown as IGraph<IVertex, IEdge>;
        testGraph1.addVertex(new Vertex('1'));
        testGraph1.addVertex(new Vertex('2'));
        testGraph1.addVertex(new Vertex('3'));
        testGraph1.addVertex(new Vertex('4'));
        testGraph1.addVertex(new Vertex('5'));
        testGraph1.addEdge(new Edge(new Vertex('1'), new Vertex('2')));
        testGraph1.addEdge(new Edge(new Vertex('2'), new Vertex('3')));
        testGraph1.addEdge(new Edge(new Vertex('3'), new Vertex('1')));
        testGraph1.addEdge(new Edge(new Vertex('3'), new Vertex('4')));
        testGraph1.addEdge(new Edge(new Vertex('2'), new Vertex('4')));
        it('test case 1', () => {
            chai.assert(test.calculate(testModel1, testGraph1) == 15);
        })
    })
    describe('extra edges', () => {
        let testGraph1: IGraph<IVertex, IEdge> = new Graph() as unknown as IGraph<IVertex, IEdge>;
        testGraph1.addVertex(new Vertex('1'));
        testGraph1.addVertex(new Vertex('2'));
        testGraph1.addVertex(new Vertex('3'));
        testGraph1.addVertex(new Vertex('4'));
        testGraph1.addEdge(new Edge(new Vertex('1'), new Vertex('2')));
        testGraph1.addEdge(new Edge(new Vertex('2'), new Vertex('3')));
        testGraph1.addEdge(new Edge(new Vertex('3'), new Vertex('1')));
        testGraph1.addEdge(new Edge(new Vertex('3'), new Vertex('4')));
        testGraph1.addEdge(new Edge(new Vertex('2'), new Vertex('4')));
        testGraph1.addEdge(new Edge(new Vertex('1'), new Vertex('4')));
        it('test case 1', () => {
            chai.assert(test.calculate(testModel1, testGraph1) == 5);
        })
    })
    describe('lack of edges', () => {
        let testGraph1: IGraph<IVertex, IEdge> = new Graph() as unknown as IGraph<IVertex, IEdge>;
        testGraph1.addVertex(new Vertex('1'));
        testGraph1.addVertex(new Vertex('2'));
        testGraph1.addVertex(new Vertex('3'));
        testGraph1.addVertex(new Vertex('4'));
        testGraph1.addEdge(new Edge(new Vertex('1'), new Vertex('2')));
        testGraph1.addEdge(new Edge(new Vertex('2'), new Vertex('3')));
        testGraph1.addEdge(new Edge(new Vertex('3'), new Vertex('1')));
        testGraph1.addEdge(new Edge(new Vertex('3'), new Vertex('4')));
        it('test case 1', () => {
            chai.assert(test.calculate(testModel1, testGraph1) == 5);
        })
    })
})