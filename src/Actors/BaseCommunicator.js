require("babel/polyfill");

import {Diagonal, Rectangular} from "../Constants/Bases.js";
import {PhotonPolarizationsSize} from "../Config/AppConfig.js";

export var getBaseCommunicator = (() => {

    var randomBasis = [];
    var photonPolarizations = [];
    var otherBasis = [];
    var sharedKey = [];

    function* basisGenerator(){
        var i=0;
        while(i<PhotonPolarizationsSize){
            i++;
            yield (Math.floor(Math.random() * (2)) === 1) ? Diagonal : Rectangular;
        }
    }

    function generateRandomBasis(){
        this.randomBasis = [];
        var gen = basisGenerator();
        var i = gen.next().value;
        while(i !== undefined){
            i = gen.next().value;
            if(i !== undefined){
                this.randomBasis.push(i);
            }
        }
    }

    function isValidChannel(channel){
        if(channel === undefined || channel.BasisUsed === undefined || channel.PhotonPolarizations === undefined){
            throw 'BaseCommunicator.js - isValidChannel() - Invalid channel provided.';
        }
        return true;
    }

    function readBasisFromChannel(channel){
        if(isValidChannel(channel)){
            this.otherBasis = channel.BasisUsed.slice(0);
        }
    }

    function sendBasisToChannel(channel){
        if(isValidChannel(channel)){
            channel.BasisUsed = randomBasis.slice(0);
        }
    }

    return {
        randomBasis: randomBasis,
        otherBasis: otherBasis,
        photonPolarizations: photonPolarizations,
        sharedKey: sharedKey,
        isValidChannel: isValidChannel,
        readFromChannel: readBasisFromChannel,
        sendBasisToChannel: sendBasisToChannel,
        generateRandomBasis: generateRandomBasis
    };

});