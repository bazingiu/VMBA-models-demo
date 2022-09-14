// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
const ndarray = require('ndarray')
const ops = require('ndarray-ops')
const onnx = require('onnxruntime-web');

function softmax(arr) {
    const a = arr.map(function (value, index) {
        return Math.exp(value) / arr.map(function (y /*value*/) {
            return Math.exp(y)
        }).reduce(function (a, b) {
            return a + b
        })
    });
    console.log(a);
    return a.map((e, i) => [e, i]).sort(([a, i], [b, j]) => b - a);
}

async function executeAlexNetModel(data, size) {
    const model = './models/AlexNet.onnx';
    return await runOD(model, data, size);
}

async function executeResNet50Model(data, size) {
    const model = './models/ResNet50.onnx';
    return await runOD(model, data, size);
}

async function runOD(model, data, size) {
    const session = await onnx.InferenceSession.create(model, {executionProviders: ['wasm']});
    const inputTensor = new onnx.Tensor('float32', data, [1, 3, size, size]);
    const taskResult = await session.run({input: inputTensor});
    return softmax(Array.from(taskResult.output.data));
}

/**
 * Preprocess raw image data to match models' requirement.
 */
function preprocess(data, width, height) {
    const dataFromImage = ndarray(new Float32Array(data), [width, height, 4]);
    const dataProcessed = ndarray(new Float32Array(width * height * 3), [1, 3, width, height]);

    // Normalize 0-255 to (-1)-1
    ops.divseq(dataFromImage, 128.0);
    ops.subseq(dataFromImage, 1.0);

    // Realign imageData from [224*224*4] to the correct dimension [1*3*224*224].
    ops.assign(dataProcessed.pick(0, 0, null, null), dataFromImage.pick(null, null, 2));
    ops.assign(dataProcessed.pick(0, 1, null, null), dataFromImage.pick(null, null, 1));
    ops.assign(dataProcessed.pick(0, 2, null, null), dataFromImage.pick(null, null, 0));

    return dataProcessed.data;
}


window.preprocess = preprocess;
window.softmax = softmax;
window.executeAlexNetModel = executeAlexNetModel;
window.executeResNet50Model = executeResNet50Model;

