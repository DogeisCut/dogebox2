var beepbox = (function (exports) {
    'use strict';

    /*!
    Copyright (c) 2012-2022 John Nesky and contributing authors

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the "Software"), to deal in
    the Software without restriction, including without limitation the rights to
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
    of the Software, and to permit persons to whom the Software is furnished to do
    so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
    class Config {
    }
    Config.thresholdVal = -10;
    Config.kneeVal = 40;
    Config.ratioVal = 12;
    Config.attackVal = 0;
    Config.releaseVal = 0.25;
    Config.scales = toNameMap([
        { name: "Free", realName: "chromatic", flags: [true, true, true, true, true, true, true, true, true, true, true, true] },
        { name: "Major", realName: "ionian", flags: [true, false, true, false, true, true, false, true, false, true, false, true] },
        { name: "Minor", realName: "aeolian", flags: [true, false, true, true, false, true, false, true, true, false, true, false] },
        { name: "Mixolydian", realName: "mixolydian", flags: [true, false, true, false, true, true, false, true, false, true, true, false] },
        { name: "Lydian", realName: "lydian", flags: [true, false, true, false, true, false, true, true, false, true, false, true] },
        { name: "Dorian", realName: "dorian", flags: [true, false, true, true, false, true, false, true, false, true, true, false] },
        { name: "Phrygian", realName: "phrygian", flags: [true, true, false, true, false, true, false, true, true, false, true, false] },
        { name: "Locrian", realName: "locrian", flags: [true, true, false, true, false, true, true, false, true, false, true, false] },
        { name: "Lydian Dominant", realName: "lydian dominant", flags: [true, false, true, false, true, false, true, true, false, true, true, false] },
        { name: "Phrygian Dominant", realName: "phrygian dominant", flags: [true, true, false, false, true, true, false, true, true, false, true, false] },
        { name: "Harmonic Major", realName: "harmonic major", flags: [true, false, true, false, true, true, false, true, true, false, false, true] },
        { name: "Harmonic Minor", realName: "harmonic minor", flags: [true, false, true, true, false, true, false, true, true, false, false, true] },
        { name: "Melodic Minor", realName: "melodic minor", flags: [true, false, true, true, false, true, false, true, false, true, false, true] },
        { name: "Blues", realName: "blues", flags: [true, false, false, true, false, true, true, true, false, false, true, false] },
        { name: "Altered", realName: "altered", flags: [true, true, false, true, true, false, true, false, true, false, true, false] },
        { name: "Major Pentatonic", realName: "major pentatonic", flags: [true, false, true, false, true, false, false, true, false, true, false, false] },
        { name: "Minor Pentatonic", realName: "minor pentatonic", flags: [true, false, false, true, false, true, false, true, false, false, true, false] },
        { name: "Whole Tone", realName: "whole tone", flags: [true, false, true, false, true, false, true, false, true, false, true, false] },
        { name: "Octatonic", realName: "octatonic", flags: [true, false, true, true, false, true, true, false, true, true, false, true] },
        { name: "Hexatonic", realName: "hexatonic", flags: [true, false, false, true, true, false, false, true, true, false, false, true] },
    ]);
    Config.keys = toNameMap([
        { name: "C", isWhiteKey: true, basePitch: 12 },
        { name: "C♯", isWhiteKey: false, basePitch: 13 },
        { name: "D", isWhiteKey: true, basePitch: 14 },
        { name: "D♯", isWhiteKey: false, basePitch: 15 },
        { name: "E", isWhiteKey: true, basePitch: 16 },
        { name: "F", isWhiteKey: true, basePitch: 17 },
        { name: "F♯", isWhiteKey: false, basePitch: 18 },
        { name: "G", isWhiteKey: true, basePitch: 19 },
        { name: "G♯", isWhiteKey: false, basePitch: 20 },
        { name: "A", isWhiteKey: true, basePitch: 21 },
        { name: "A♯", isWhiteKey: false, basePitch: 22 },
        { name: "B", isWhiteKey: true, basePitch: 23 },
    ]);
    Config.blackKeyNameParents = [-1, 1, -1, 1, -1, 1, -1, -1, 1, -1, 1, -1];
    Config.tempoMin = 30;
    Config.tempoMax = 320;
    Config.echoDelayRange = 24;
    Config.echoDelayStepTicks = 4;
    Config.echoSustainRange = 8;
    Config.echoShelfHz = 4000.0;
    Config.echoShelfGain = Math.pow(2.0, -0.5);
    Config.reverbShelfHz = 8000.0;
    Config.reverbShelfGain = Math.pow(2.0, -1.5);
    Config.reverbRange = 32;
    Config.reverbDelayBufferSize = 16384;
    Config.reverbDelayBufferMask = Config.reverbDelayBufferSize - 1;
    Config.beatsPerBarMin = 3;
    Config.beatsPerBarMax = 16;
    Config.barCountMin = 1;
    Config.barCountMax = 256;
    Config.instrumentCountMin = 1;
    Config.layeredInstrumentCountMax = 4;
    Config.patternInstrumentCountMax = 10;
    Config.partsPerBeat = 24;
    Config.ticksPerPart = 2;
    Config.ticksPerArpeggio = 3;
    Config.arpeggioPatterns = [[0], [0, 1], [0, 1, 2, 1], [0, 1, 2, 3], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 4, 5, 6, 7]];
    Config.rhythms = toNameMap([
        { name: "÷3 (triplets)", stepsPerBeat: 3, roundUpThresholds: [5, 12, 18] },
        { name: "÷4 (standard)", stepsPerBeat: 4, roundUpThresholds: [3, 9, 17, 21] },
        { name: "÷6", stepsPerBeat: 6, roundUpThresholds: null },
        { name: "÷8", stepsPerBeat: 8, roundUpThresholds: null },
        { name: "freehand", stepsPerBeat: 24, roundUpThresholds: null },
    ]);
    Config.instrumentTypeNames = ["chip", "FM", "noise", "spectrum", "drumset", "harmonics", "PWM", "Picked String", "custom chip", "mod"];
    Config.instrumentTypeHasSpecialInterval = [true, true, false, false, false, true, false, false, false];
    Config.chipBaseExpression = 0.03375;
    Config.fmBaseExpression = 0.03;
    Config.noiseBaseExpression = 0.19;
    Config.spectrumBaseExpression = 0.3;
    Config.drumsetBaseExpression = 0.45;
    Config.harmonicsBaseExpression = 0.025;
    Config.pwmBaseExpression = 0.04725;
    Config.pickedStringBaseExpression = 0.025;
    Config.distortionBaseVolume = 0.011;
    Config.bitcrusherBaseVolume = 0.010;
    Config.rawChipWaves = toNameMap([
        { name: "rounded", expression: 0.94, samples: centerWave([0.0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.95, 0.9, 0.85, 0.8, 0.7, 0.6, 0.5, 0.4, 0.2, 0.0, -0.2, -0.4, -0.5, -0.6, -0.7, -0.8, -0.85, -0.9, -0.95, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -0.95, -0.9, -0.85, -0.8, -0.7, -0.6, -0.5, -0.4, -0.2]) },
        { name: "triangle", expression: 1.0, samples: centerWave([1.0 / 15.0, 3.0 / 15.0, 5.0 / 15.0, 7.0 / 15.0, 9.0 / 15.0, 11.0 / 15.0, 13.0 / 15.0, 15.0 / 15.0, 15.0 / 15.0, 13.0 / 15.0, 11.0 / 15.0, 9.0 / 15.0, 7.0 / 15.0, 5.0 / 15.0, 3.0 / 15.0, 1.0 / 15.0, -1.0 / 15.0, -3.0 / 15.0, -5.0 / 15.0, -7.0 / 15.0, -9.0 / 15.0, -11.0 / 15.0, -13.0 / 15.0, -15.0 / 15.0, -15.0 / 15.0, -13.0 / 15.0, -11.0 / 15.0, -9.0 / 15.0, -7.0 / 15.0, -5.0 / 15.0, -3.0 / 15.0, -1.0 / 15.0]) },
        { name: "square", expression: 0.5, samples: centerWave([1.0, -1.0]) },
        { name: "1/4 pulse", expression: 0.5, samples: centerWave([1.0, -1.0, -1.0, -1.0]) },
        { name: "1/8 pulse", expression: 0.5, samples: centerWave([1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0]) },
        { name: "sawtooth", expression: 0.65, samples: centerWave([1.0 / 31.0, 3.0 / 31.0, 5.0 / 31.0, 7.0 / 31.0, 9.0 / 31.0, 11.0 / 31.0, 13.0 / 31.0, 15.0 / 31.0, 17.0 / 31.0, 19.0 / 31.0, 21.0 / 31.0, 23.0 / 31.0, 25.0 / 31.0, 27.0 / 31.0, 29.0 / 31.0, 31.0 / 31.0, -31.0 / 31.0, -29.0 / 31.0, -27.0 / 31.0, -25.0 / 31.0, -23.0 / 31.0, -21.0 / 31.0, -19.0 / 31.0, -17.0 / 31.0, -15.0 / 31.0, -13.0 / 31.0, -11.0 / 31.0, -9.0 / 31.0, -7.0 / 31.0, -5.0 / 31.0, -3.0 / 31.0, -1.0 / 31.0]) },
        { name: "double saw", expression: 0.5, samples: centerWave([0.0, -0.2, -0.4, -0.6, -0.8, -1.0, 1.0, -0.8, -0.6, -0.4, -0.2, 1.0, 0.8, 0.6, 0.4, 0.2]) },
        { name: "double pulse", expression: 0.4, samples: centerWave([1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0]) },
        { name: "spiky", expression: 0.4, samples: centerWave([1.0, -1.0, 1.0, -1.0, 1.0, 0.0]) },
        { name: "sine", expression: 0.88, samples: centerAndNormalizeWave([8.0, 9.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.0, 15.0, 15.0, 14.0, 14.0, 13.0, 11.0, 10.0, 9.0, 7.0, 6.0, 4.0, 3.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 2.0, 4.0, 5.0, 6.0]) },
        { name: "flute", expression: 0.8, samples: centerAndNormalizeWave([3.0, 4.0, 6.0, 8.0, 10.0, 11.0, 13.0, 14.0, 15.0, 15.0, 14.0, 13.0, 11.0, 8.0, 5.0, 3.0]) },
        { name: "harp", expression: 0.8, samples: centerAndNormalizeWave([0.0, 3.0, 3.0, 3.0, 4.0, 5.0, 5.0, 6.0, 7.0, 8.0, 9.0, 11.0, 11.0, 13.0, 13.0, 15.0, 15.0, 14.0, 12.0, 11.0, 10.0, 9.0, 8.0, 7.0, 7.0, 5.0, 4.0, 3.0, 2.0, 1.0, 0.0, 0.0]) },
        { name: "sharp clarinet", expression: 0.38, samples: centerAndNormalizeWave([0.0, 0.0, 0.0, 1.0, 1.0, 8.0, 8.0, 9.0, 9.0, 9.0, 8.0, 8.0, 8.0, 8.0, 8.0, 9.0, 9.0, 7.0, 9.0, 9.0, 10.0, 4.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]) },
        { name: "soft clarinet", expression: 0.45, samples: centerAndNormalizeWave([0.0, 1.0, 5.0, 8.0, 9.0, 9.0, 9.0, 9.0, 9.0, 9.0, 9.0, 11.0, 11.0, 12.0, 13.0, 12.0, 10.0, 9.0, 7.0, 6.0, 4.0, 3.0, 3.0, 3.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]) },
        { name: "alto sax", expression: 0.3, samples: centerAndNormalizeWave([5.0, 5.0, 6.0, 4.0, 3.0, 6.0, 8.0, 7.0, 2.0, 1.0, 5.0, 6.0, 5.0, 4.0, 5.0, 7.0, 9.0, 11.0, 13.0, 14.0, 14.0, 14.0, 14.0, 13.0, 10.0, 8.0, 7.0, 7.0, 4.0, 3.0, 4.0, 2.0]) },
        { name: "bassoon", expression: 0.35, samples: centerAndNormalizeWave([9.0, 9.0, 7.0, 6.0, 5.0, 4.0, 4.0, 4.0, 4.0, 5.0, 7.0, 8.0, 9.0, 10.0, 11.0, 13.0, 13.0, 11.0, 10.0, 9.0, 7.0, 6.0, 4.0, 2.0, 1.0, 1.0, 1.0, 2.0, 2.0, 5.0, 11.0, 14.0]) },
        { name: "trumpet", expression: 0.22, samples: centerAndNormalizeWave([10.0, 11.0, 8.0, 6.0, 5.0, 5.0, 5.0, 6.0, 7.0, 7.0, 7.0, 7.0, 6.0, 6.0, 7.0, 7.0, 7.0, 7.0, 7.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 7.0, 8.0, 9.0, 11.0, 14.0]) },
        { name: "electric guitar", expression: 0.2, samples: centerAndNormalizeWave([11.0, 12.0, 12.0, 10.0, 6.0, 6.0, 8.0, 0.0, 2.0, 4.0, 8.0, 10.0, 9.0, 10.0, 1.0, 7.0, 11.0, 3.0, 6.0, 6.0, 8.0, 13.0, 14.0, 2.0, 0.0, 12.0, 8.0, 4.0, 13.0, 11.0, 10.0, 13.0]) },
        { name: "organ", expression: 0.2, samples: centerAndNormalizeWave([11.0, 10.0, 12.0, 11.0, 14.0, 7.0, 5.0, 5.0, 12.0, 10.0, 10.0, 9.0, 12.0, 6.0, 4.0, 5.0, 13.0, 12.0, 12.0, 10.0, 12.0, 5.0, 2.0, 2.0, 8.0, 6.0, 6.0, 5.0, 8.0, 3.0, 2.0, 1.0]) },
        { name: "pan flute", expression: 0.35, samples: centerAndNormalizeWave([1.0, 4.0, 7.0, 6.0, 7.0, 9.0, 7.0, 7.0, 11.0, 12.0, 13.0, 15.0, 13.0, 11.0, 11.0, 12.0, 13.0, 10.0, 7.0, 5.0, 3.0, 6.0, 10.0, 7.0, 3.0, 3.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0]) },
        { name: "glitch", expression: 0.5, samples: centerWave([1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0]) },
    ]);
    Config.chipWaves = rawChipToIntegrated(Config.rawChipWaves);
    Config.chipNoises = toNameMap([
        { name: "retro", expression: 0.25, basePitch: 69, pitchFilterMult: 1024.0, isSoft: false, samples: null },
        { name: "white", expression: 1.0, basePitch: 69, pitchFilterMult: 8.0, isSoft: true, samples: null },
        { name: "clang", expression: 0.4, basePitch: 69, pitchFilterMult: 1024.0, isSoft: false, samples: null },
        { name: "buzz", expression: 0.3, basePitch: 69, pitchFilterMult: 1024.0, isSoft: false, samples: null },
        { name: "hollow", expression: 1.5, basePitch: 96, pitchFilterMult: 1.0, isSoft: true, samples: null },
        { name: "shine", expression: 1.0, basePitch: 69, pitchFilterMult: 1024.0, isSoft: false, samples: null },
        { name: "deep", expression: 1.5, basePitch: 120, pitchFilterMult: 1024.0, isSoft: true, samples: null },
        { name: "cutter", expression: 0.005, basePitch: 96, pitchFilterMult: 1024.0, isSoft: false, samples: null },
        { name: "metallic", expression: 1.0, basePitch: 96, pitchFilterMult: 1024.0, isSoft: false, samples: null },
    ]);
    Config.filterFreqStep = 1.0 / 4.0;
    Config.filterFreqRange = 34;
    Config.filterFreqReferenceSetting = 28;
    Config.filterFreqReferenceHz = 8000.0;
    Config.filterFreqMaxHz = Config.filterFreqReferenceHz * Math.pow(2.0, Config.filterFreqStep * (Config.filterFreqRange - 1 - Config.filterFreqReferenceSetting));
    Config.filterFreqMinHz = 8.0;
    Config.filterGainRange = 15;
    Config.filterGainCenter = 7;
    Config.filterGainStep = 1.0 / 2.0;
    Config.filterMaxPoints = 8;
    Config.filterTypeNames = ["low-pass", "high-pass", "peak"];
    Config.filterMorphCount = 10;
    Config.filterSimpleCutRange = 11;
    Config.filterSimplePeakRange = 8;
    Config.fadeInRange = 10;
    Config.fadeOutTicks = [-24, -12, -6, -3, -1, 6, 12, 24, 48, 72, 96];
    Config.fadeOutNeutral = 4;
    Config.drumsetFadeOutTicks = 48;
    Config.transitions = toNameMap([
        { name: "normal", isSeamless: false, continues: false, slides: false, slideTicks: 3, includeAdjacentPatterns: false },
        { name: "interrupt", isSeamless: true, continues: false, slides: false, slideTicks: 3, includeAdjacentPatterns: true },
        { name: "continue", isSeamless: true, continues: true, slides: false, slideTicks: 3, includeAdjacentPatterns: true },
        { name: "slide", isSeamless: true, continues: false, slides: true, slideTicks: 3, includeAdjacentPatterns: true },
        { name: "slide in pattern", isSeamless: true, continues: false, slides: true, slideTicks: 3, includeAdjacentPatterns: false },
    ]);
    Config.vibratos = toNameMap([
        { name: "none", amplitude: 0.0, type: 0, delayTicks: 0 },
        { name: "light", amplitude: 0.15, type: 0, delayTicks: 0 },
        { name: "delayed", amplitude: 0.3, type: 0, delayTicks: 37 },
        { name: "heavy", amplitude: 0.45, type: 0, delayTicks: 0 },
        { name: "shaky", amplitude: 0.1, type: 1, delayTicks: 0 },
    ]);
    Config.vibratoTypes = toNameMap([
        { name: "normal", periodsSeconds: [0.14], period: 0.14 },
        { name: "shaky", periodsSeconds: [0.11, 1.618 * 0.11, 3 * 0.11], period: 266.97 },
    ]);
    Config.arpSpeedScale = [0, 0.0625, 0.125, 0.2, 0.25, 1 / 3, 0.4, 0.5, 2 / 3, 0.75, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4, 4.15, 4.3, 4.5, 4.8, 5, 5.5, 6, 8];
    Config.unisons = toNameMap([
        { name: "none", voices: 1, spread: 0.0, offset: 0.0, expression: 1.4, sign: 1.0 },
        { name: "shimmer", voices: 2, spread: 0.018, offset: 0.0, expression: 0.8, sign: 1.0 },
        { name: "hum", voices: 2, spread: 0.045, offset: 0.0, expression: 1.0, sign: 1.0 },
        { name: "honky tonk", voices: 2, spread: 0.09, offset: 0.0, expression: 1.0, sign: 1.0 },
        { name: "dissonant", voices: 2, spread: 0.25, offset: 0.0, expression: 0.9, sign: 1.0 },
        { name: "fifth", voices: 2, spread: 3.5, offset: 3.5, expression: 0.9, sign: 1.0 },
        { name: "octave", voices: 2, spread: 6.0, offset: 6.0, expression: 0.8, sign: 1.0 },
        { name: "bowed", voices: 2, spread: 0.02, offset: 0.0, expression: 1.0, sign: -1.0 },
        { name: "piano", voices: 2, spread: 0.01, offset: 0.0, expression: 1.0, sign: 0.7 },
        { name: "warbled", voices: 2, spread: 0.25, offset: 0.05, expression: 0.9, sign: -0.8 },
    ]);
    Config.effectNames = ["reverb", "chorus", "panning", "distortion", "bitcrusher", "note filter", "echo", "pitch shift", "detune", "vibrato", "transition type", "chord type"];
    Config.effectOrder = [2, 10, 11, 7, 8, 9, 5, 3, 4, 1, 6, 0];
    Config.noteSizeMax = 6;
    Config.volumeRange = 50;
    Config.volumeLogScale = 0.1428;
    Config.panCenter = 50;
    Config.panMax = Config.panCenter * 2;
    Config.panDelaySecondsMax = 0.001;
    Config.chorusRange = 8;
    Config.chorusPeriodSeconds = 2.0;
    Config.chorusDelayRange = 0.0034;
    Config.chorusDelayOffsets = [[1.51, 2.10, 3.35], [1.47, 2.15, 3.25]];
    Config.chorusPhaseOffsets = [[0.0, 2.1, 4.2], [3.2, 5.3, 1.0]];
    Config.chorusMaxDelay = Config.chorusDelayRange * (1.0 + Config.chorusDelayOffsets[0].concat(Config.chorusDelayOffsets[1]).reduce((x, y) => Math.max(x, y)));
    Config.chords = toNameMap([
        { name: "simultaneous", customInterval: false, arpeggiates: false, strumParts: 0, singleTone: false },
        { name: "strum", customInterval: false, arpeggiates: false, strumParts: 1, singleTone: false },
        { name: "arpeggio", customInterval: false, arpeggiates: true, strumParts: 0, singleTone: true },
        { name: "custom interval", customInterval: true, arpeggiates: false, strumParts: 0, singleTone: true },
    ]);
    Config.maxChordSize = 9;
    Config.operatorCount = 4;
    Config.maxPitchOrOperatorCount = Math.max(Config.maxChordSize, Config.operatorCount);
    Config.algorithms = toNameMap([
        { name: "1←(2 3 4)", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2, 3, 4], [], [], []] },
        { name: "1←(2 3←4)", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2, 3], [], [4], []] },
        { name: "1←2←(3 4)", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2], [3, 4], [], []] },
        { name: "1←(2 3)←4", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2, 3], [4], [4], []] },
        { name: "1←2←3←4", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2], [3], [4], []] },
        { name: "1←3 2←4", carrierCount: 2, associatedCarrier: [1, 2, 1, 2], modulatedBy: [[3], [4], [], []] },
        { name: "1 2←(3 4)", carrierCount: 2, associatedCarrier: [1, 2, 2, 2], modulatedBy: [[], [3, 4], [], []] },
        { name: "1 2←3←4", carrierCount: 2, associatedCarrier: [1, 2, 2, 2], modulatedBy: [[], [3], [4], []] },
        { name: "(1 2)←3←4", carrierCount: 2, associatedCarrier: [1, 2, 2, 2], modulatedBy: [[3], [3], [4], []] },
        { name: "(1 2)←(3 4)", carrierCount: 2, associatedCarrier: [1, 2, 2, 2], modulatedBy: [[3, 4], [3, 4], [], []] },
        { name: "1 2 3←4", carrierCount: 3, associatedCarrier: [1, 2, 3, 3], modulatedBy: [[], [], [4], []] },
        { name: "(1 2 3)←4", carrierCount: 3, associatedCarrier: [1, 2, 3, 3], modulatedBy: [[4], [4], [4], []] },
        { name: "1 2 3 4", carrierCount: 4, associatedCarrier: [1, 2, 3, 4], modulatedBy: [[], [], [], []] },
    ]);
    Config.operatorCarrierInterval = [0.0, 0.04, -0.073, 0.091];
    Config.operatorAmplitudeMax = 15;
    Config.operatorFrequencies = toNameMap([
        { name: "1×", mult: 1.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "~1×", mult: 1.0, hzOffset: 1.5, amplitudeSign: -1.0 },
        { name: "2×", mult: 2.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "~2×", mult: 2.0, hzOffset: -1.3, amplitudeSign: -1.0 },
        { name: "3×", mult: 3.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "4×", mult: 4.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "5×", mult: 5.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "6×", mult: 6.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "7×", mult: 7.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "8×", mult: 8.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "9×", mult: 9.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "11×", mult: 11.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "13×", mult: 13.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "16×", mult: 16.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "20×", mult: 20.0, hzOffset: 0.0, amplitudeSign: 1.0 },
    ]);
    Config.envelopes = toNameMap([
        { name: "none", type: 1, speed: 0.0 },
        { name: "note size", type: 0, speed: 0.0 },
        { name: "punch", type: 2, speed: 0.0 },
        { name: "flare 1", type: 3, speed: 32.0 },
        { name: "flare 2", type: 3, speed: 8.0 },
        { name: "flare 3", type: 3, speed: 2.0 },
        { name: "twang 1", type: 4, speed: 32.0 },
        { name: "twang 2", type: 4, speed: 8.0 },
        { name: "twang 3", type: 4, speed: 2.0 },
        { name: "swell 1", type: 5, speed: 32.0 },
        { name: "swell 2", type: 5, speed: 8.0 },
        { name: "swell 3", type: 5, speed: 2.0 },
        { name: "tremolo1", type: 6, speed: 4.0 },
        { name: "tremolo2", type: 6, speed: 2.0 },
        { name: "tremolo3", type: 6, speed: 1.0 },
        { name: "tremolo4", type: 7, speed: 4.0 },
        { name: "tremolo5", type: 7, speed: 2.0 },
        { name: "tremolo6", type: 7, speed: 1.0 },
        { name: "decay 1", type: 8, speed: 10.0 },
        { name: "decay 2", type: 8, speed: 7.0 },
        { name: "decay 3", type: 8, speed: 4.0 },
    ]);
    Config.feedbacks = toNameMap([
        { name: "1⟲", indices: [[1], [], [], []] },
        { name: "2⟲", indices: [[], [2], [], []] },
        { name: "3⟲", indices: [[], [], [3], []] },
        { name: "4⟲", indices: [[], [], [], [4]] },
        { name: "1⟲ 2⟲", indices: [[1], [2], [], []] },
        { name: "3⟲ 4⟲", indices: [[], [], [3], [4]] },
        { name: "1⟲ 2⟲ 3⟲", indices: [[1], [2], [3], []] },
        { name: "2⟲ 3⟲ 4⟲", indices: [[], [2], [3], [4]] },
        { name: "1⟲ 2⟲ 3⟲ 4⟲", indices: [[1], [2], [3], [4]] },
        { name: "1→2", indices: [[], [1], [], []] },
        { name: "1→3", indices: [[], [], [1], []] },
        { name: "1→4", indices: [[], [], [], [1]] },
        { name: "2→3", indices: [[], [], [2], []] },
        { name: "2→4", indices: [[], [], [], [2]] },
        { name: "3→4", indices: [[], [], [], [3]] },
        { name: "1→3 2→4", indices: [[], [], [1], [2]] },
        { name: "1→4 2→3", indices: [[], [], [2], [1]] },
        { name: "1→2→3→4", indices: [[], [1], [2], [3]] },
    ]);
    Config.chipNoiseLength = 1 << 15;
    Config.spectrumNoiseLength = 1 << 15;
    Config.spectrumBasePitch = 24;
    Config.spectrumControlPoints = 30;
    Config.spectrumControlPointsPerOctave = 7;
    Config.spectrumControlPointBits = 3;
    Config.spectrumMax = (1 << Config.spectrumControlPointBits) - 1;
    Config.harmonicsControlPoints = 28;
    Config.harmonicsRendered = 64;
    Config.harmonicsRenderedForPickedString = 1 << 8;
    Config.harmonicsControlPointBits = 3;
    Config.harmonicsMax = (1 << Config.harmonicsControlPointBits) - 1;
    Config.harmonicsWavelength = 1 << 11;
    Config.pulseWidthRange = 50;
    Config.pulseWidthStepPower = 0.5;
    Config.pitchChannelCountMin = 1;
    Config.pitchChannelCountMax = 40;
    Config.noiseChannelCountMin = 0;
    Config.noiseChannelCountMax = 16;
    Config.modChannelCountMin = 0;
    Config.modChannelCountMax = 12;
    Config.noiseInterval = 6;
    Config.pitchesPerOctave = 12;
    Config.drumCount = 12;
    Config.pitchOctaves = 8;
    Config.modCount = 6;
    Config.maxPitch = Config.pitchOctaves * Config.pitchesPerOctave;
    Config.maximumTonesPerChannel = Config.maxChordSize * 2;
    Config.justIntonationSemitones = [1.0 / 2.0, 8.0 / 15.0, 9.0 / 16.0, 3.0 / 5.0, 5.0 / 8.0, 2.0 / 3.0, 32.0 / 45.0, 3.0 / 4.0, 4.0 / 5.0, 5.0 / 6.0, 8.0 / 9.0, 15.0 / 16.0, 1.0, 16.0 / 15.0, 9.0 / 8.0, 6.0 / 5.0, 5.0 / 4.0, 4.0 / 3.0, 45.0 / 32.0, 3.0 / 2.0, 8.0 / 5.0, 5.0 / 3.0, 16.0 / 9.0, 15.0 / 8.0, 2.0].map(x => Math.log2(x) * Config.pitchesPerOctave);
    Config.pitchShiftRange = Config.justIntonationSemitones.length;
    Config.pitchShiftCenter = Config.pitchShiftRange >> 1;
    Config.detuneCenter = 200;
    Config.detuneMax = 400;
    Config.detuneMin = 0;
    Config.songDetuneMin = 0;
    Config.songDetuneMax = 500;
    Config.sineWaveLength = 1 << 8;
    Config.sineWaveMask = Config.sineWaveLength - 1;
    Config.sineWave = generateSineWave();
    Config.pickedStringDispersionCenterFreq = 6000.0;
    Config.pickedStringDispersionFreqScale = 0.3;
    Config.pickedStringDispersionFreqMult = 4.0;
    Config.pickedStringShelfHz = 4000.0;
    Config.distortionRange = 8;
    Config.stringSustainRange = 15;
    Config.stringDecayRate = 0.12;
    Config.bitcrusherFreqRange = 14;
    Config.bitcrusherOctaveStep = 0.5;
    Config.bitcrusherQuantizationRange = 8;
    Config.maxEnvelopeCount = 12;
    Config.defaultAutomationRange = 13;
    Config.instrumentAutomationTargets = toNameMap([
        { name: "none", computeIndex: null, displayName: "none", interleave: false, isFilter: false, maxCount: 1, effect: null, compatibleInstruments: null },
        { name: "noteVolume", computeIndex: 0, displayName: "note volume", interleave: false, isFilter: false, maxCount: 1, effect: null, compatibleInstruments: null },
        { name: "pulseWidth", computeIndex: 2, displayName: "pulse width", interleave: false, isFilter: false, maxCount: 1, effect: null, compatibleInstruments: [6] },
        { name: "stringSustain", computeIndex: 3, displayName: "sustain", interleave: false, isFilter: false, maxCount: 1, effect: null, compatibleInstruments: [7] },
        { name: "unison", computeIndex: 4, displayName: "unison", interleave: false, isFilter: false, maxCount: 1, effect: null, compatibleInstruments: [0, 5, 7] },
        { name: "operatorFrequency", computeIndex: 5, displayName: "fm# freq", interleave: true, isFilter: false, maxCount: Config.operatorCount, effect: null, compatibleInstruments: [1] },
        { name: "operatorAmplitude", computeIndex: 9, displayName: "fm# volume", interleave: false, isFilter: false, maxCount: Config.operatorCount, effect: null, compatibleInstruments: [1] },
        { name: "feedbackAmplitude", computeIndex: 13, displayName: "fm feedback", interleave: false, isFilter: false, maxCount: 1, effect: null, compatibleInstruments: [1] },
        { name: "pitchShift", computeIndex: 14, displayName: "pitch shift", interleave: false, isFilter: false, maxCount: 1, effect: 7, compatibleInstruments: null },
        { name: "detune", computeIndex: 15, displayName: "detune", interleave: false, isFilter: false, maxCount: 1, effect: 8, compatibleInstruments: null },
        { name: "vibratoDepth", computeIndex: 16, displayName: "vibrato range", interleave: false, isFilter: false, maxCount: 1, effect: 9, compatibleInstruments: null },
        { name: "noteFilterAllFreqs", computeIndex: 1, displayName: "n. filter freqs", interleave: false, isFilter: true, maxCount: 1, effect: 5, compatibleInstruments: null },
        { name: "noteFilterFreq", computeIndex: 17, displayName: "n. filter # freq", interleave: false, isFilter: true, maxCount: Config.filterMaxPoints, effect: 5, compatibleInstruments: null },
    ]);
    Config.operatorWaves = toNameMap([
        { name: "sine", samples: Config.sineWave },
        { name: "triangle", samples: generateTriWave() },
        { name: "sawtooth", samples: generateSawWave() },
        { name: "pulse width", samples: generateSquareWave() },
        { name: "ramp", samples: generateSawWave(true) },
        { name: "trapezoid", samples: generateTrapezoidWave(2) },
    ]);
    Config.pwmOperatorWaves = toNameMap([
        { name: "1%", samples: generateSquareWave(0.01) },
        { name: "5%", samples: generateSquareWave(0.05) },
        { name: "12.5%", samples: generateSquareWave(0.125) },
        { name: "25%", samples: generateSquareWave(0.25) },
        { name: "33%", samples: generateSquareWave(1 / 3) },
        { name: "50%", samples: generateSquareWave(0.5) },
        { name: "66%", samples: generateSquareWave(2 / 3) },
        { name: "75%", samples: generateSquareWave(0.75) },
        { name: "87.5%", samples: generateSquareWave(0.875) },
        { name: "95%", samples: generateSquareWave(0.95) },
        { name: "99%", samples: generateSquareWave(0.99) },
    ]);
    Config.barEditorHeight = 10;
    Config.modulators = toNameMap([
        { name: "none", pianoName: "None", maxRawVol: 6, newNoteVol: 6, forSong: true, convertRealFactor: 0, associatedEffect: 12,
            promptName: "No Mod Setting", promptDesc: ["No setting has been chosen yet, so this modulator will have no effect. Try choosing a setting with the dropdown, then click this '?' again for more info.", "[$LO - $HI]"] },
        { name: "song volume", pianoName: "Volume", maxRawVol: 100, newNoteVol: 100, forSong: true, convertRealFactor: 0, associatedEffect: 12,
            promptName: "Song Volume", promptDesc: ["This setting affects the overall volume of the song, just like the main volume slider.", "At $HI, the volume will be unchanged from default, and it will get gradually quieter down to $LO.", "[MULTIPLICATIVE] [$LO - $HI] [%]"] },
        { name: "tempo", pianoName: "Tempo", maxRawVol: Config.tempoMax - Config.tempoMin, newNoteVol: Math.ceil((Config.tempoMax - Config.tempoMin) / 2), forSong: true, convertRealFactor: Config.tempoMin, associatedEffect: 12,
            promptName: "Song Tempo", promptDesc: ["This setting controls the speed your song plays at, just like the tempo slider.", "When you first make a note for this setting, it will default to your current tempo. Raising it speeds up the song, up to $HI BPM, and lowering it slows it down, to a minimum of $LO BPM.", "Note that you can make a 'swing' effect by rapidly changing between two tempo values.", "[OVERWRITING] [$LO - $HI] [BPM]"] },
        { name: "song reverb", pianoName: "Reverb", maxRawVol: Config.reverbRange * 2, newNoteVol: Config.reverbRange, forSong: true, convertRealFactor: -Config.reverbRange, associatedEffect: 12,
            promptName: "Song Reverb", promptDesc: ["This setting affects the overall reverb of your song. It works by multiplying existing reverb for instruments, so those with no reverb set will be unaffected.", "At $MID, all instruments' reverb will be unchanged from default. This increases up to double the reverb value at $HI, or down to no reverb at $LO.", "[MULTIPLICATIVE] [$LO - $HI]"] },
        { name: "next bar", pianoName: "Next Bar", maxRawVol: 1, newNoteVol: 1, forSong: true, convertRealFactor: 0, associatedEffect: 12,
            promptName: "Go To Next Bar", promptDesc: ["This setting functions a little different from most. Wherever a note is placed, the song will jump immediately to the next bar when it is encountered.", "This jump happens at the very start of the note, so the length of a next-bar note is irrelevant. Also, the note can be value 0 or 1, but the value is also irrelevant - wherever you place a note, the song will jump.", "You can make mixed-meter songs or intro sections by cutting off unneeded beats with a next-bar modulator.", "[$LO - $HI]"] },
        { name: "note volume", pianoName: "Note Vol.", maxRawVol: Config.volumeRange, newNoteVol: Math.ceil(Config.volumeRange / 2), forSong: false, convertRealFactor: Math.ceil(-Config.volumeRange / 2.0), associatedEffect: 12,
            promptName: "Note Volume", promptDesc: ["This setting affects the volume of your instrument as if its note size had been scaled.", "At $MID, an instrument's volume will be unchanged from default. This means you can still use the volume sliders to mix the base volume of instruments. The volume gradually increases up to $HI, or decreases down to mute at $LO.", "This setting was the default for volume modulation in JummBox for a long time. Due to some new effects like distortion and bitcrush, note volume doesn't always allow fine volume control. Also, this modulator affects the value of FM modulator waves instead of just carriers. This can distort the sound which may be useful, but also may be undesirable. In those cases, use the 'mix volume' modulator instead, which will always just scale the volume with no added effects.", "For display purposes, this mod will show up on the instrument volume slider, as long as there is not also an active 'mix volume' modulator anyhow. However, as mentioned, it works more like changing note volume.", "[MULTIPLICATIVE] [$LO - $HI]"] },
        { name: "pan", pianoName: "Pan", maxRawVol: Config.panMax, newNoteVol: Math.ceil(Config.panMax / 2), forSong: false, convertRealFactor: 0, associatedEffect: 2,
            promptName: "Instrument Panning", promptDesc: ["This setting controls the panning of your instrument, just like the panning slider.", "At $LO, your instrument will sound like it is coming fully from the left-ear side. At $MID it will be right in the middle, and at $HI, it will sound like it's on the right.", "[OVERWRITING] [$LO - $HI] [L-R]"] },
        { name: "reverb", pianoName: "Reverb", maxRawVol: Config.reverbRange, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: 0,
            promptName: "Instrument Reverb", promptDesc: ["This setting controls the reverb of your insturment, just like the reverb slider.", "At $LO, your instrument will have no reverb. At $HI, it will be at maximum.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "distortion", pianoName: "Distortion", maxRawVol: Config.distortionRange - 1, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: 3,
            promptName: "Instrument Distortion", promptDesc: ["This setting controls the amount of distortion for your instrument, just like the distortion slider.", "At $LO, your instrument will have no distortion. At $HI, it will be at maximum.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "fm slider 1", pianoName: "FM 1", maxRawVol: 15, newNoteVol: 15, forSong: false, convertRealFactor: 0, associatedEffect: 12,
            promptName: "FM Slider 1", promptDesc: ["This setting affects the strength of the first FM slider, just like the corresponding slider on your instrument.", "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.", "For the full range of control with this mod, move your underlying slider all the way to the right.", "[MULTIPLICATIVE] [$LO - $HI] [%]"] },
        { name: "fm slider 2", pianoName: "FM 2", maxRawVol: 15, newNoteVol: 15, forSong: false, convertRealFactor: 0, associatedEffect: 12,
            promptName: "FM Slider 2", promptDesc: ["This setting affects the strength of the second FM slider, just like the corresponding slider on your instrument.", "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.", "For the full range of control with this mod, move your underlying slider all the way to the right.", "[MULTIPLICATIVE] [$LO - $HI] [%]"] },
        { name: "fm slider 3", pianoName: "FM 3", maxRawVol: 15, newNoteVol: 15, forSong: false, convertRealFactor: 0, associatedEffect: 12,
            promptName: "FM Slider 3", promptDesc: ["This setting affects the strength of the third FM slider, just like the corresponding slider on your instrument.", "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.", "For the full range of control with this mod, move your underlying slider all the way to the right.", "[MULTIPLICATIVE] [$LO - $HI] [%]"] },
        { name: "fm slider 4", pianoName: "FM 4", maxRawVol: 15, newNoteVol: 15, forSong: false, convertRealFactor: 0, associatedEffect: 12,
            promptName: "FM Slider 4", promptDesc: ["This setting affects the strength of the fourth FM slider, just like the corresponding slider on your instrument.", "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.", "For the full range of control with this mod, move your underlying slider all the way to the right.", "[MULTIPLICATIVE] [$LO - $HI] [%]"] },
        { name: "fm feedback", pianoName: "FM Feedback", maxRawVol: 15, newNoteVol: 15, forSong: false, convertRealFactor: 0, associatedEffect: 12,
            promptName: "FM Feedback", promptDesc: ["This setting affects the strength of the FM feedback slider, just like the corresponding slider on your instrument.", "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.", "For the full range of control with this mod, move your underlying slider all the way to the right.", "[MULTIPLICATIVE] [$LO - $HI] [%]"] },
        { name: "pulse width", pianoName: "Pulse Width", maxRawVol: Config.pulseWidthRange, newNoteVol: Config.pulseWidthRange, forSong: false, convertRealFactor: 0, associatedEffect: 12,
            promptName: "Pulse Width", promptDesc: ["This setting controls the width of this instrument's pulse wave, just like the pulse width slider.", "At $HI, your instrument will sound like a pure square wave (on 50% of the time). It will gradually sound narrower down to $LO, where it will be inaudible (as it is on 0% of the time).", "Changing pulse width randomly between a few values is a common strategy in chiptune music to lend some personality to a lead instrument.", "[OVERWRITING] [$LO - $HI] [%Duty]"] },
        { name: "detune", pianoName: "Detune", maxRawVol: Config.detuneMax - Config.detuneMin, newNoteVol: Config.detuneCenter, forSong: false, convertRealFactor: -Config.detuneCenter, associatedEffect: 8,
            promptName: "Instrument Detune", promptDesc: ["This setting controls the detune for this instrument, just like the detune slider.", "At $MID, your instrument will have no detune applied. Each tick corresponds to one cent, or one-hundredth of a pitch. Thus, each change of 100 ticks corresponds to one half-step of detune, up to two half-steps up at $HI, or two half-steps down at $LO.", "[OVERWRITING] [$LO - $HI] [cents]"] },
        { name: "vibrato depth", pianoName: "Vibrato Depth", maxRawVol: 50, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: 9,
            promptName: "Vibrato Depth", promptDesc: ["This setting controls the amount that your pitch moves up and down by during vibrato, just like the vibrato depth slider.", "At $LO, your instrument will have no vibrato depth so its vibrato would be inaudible. This increases up to $HI, where an extreme pitch change will be noticeable.", "[OVERWRITING] [$LO - $HI] [pitch ÷25]"] },
        { name: "song detune", pianoName: "Detune", maxRawVol: Config.songDetuneMax - Config.songDetuneMin, newNoteVol: Math.ceil((Config.songDetuneMax - Config.songDetuneMin) / 2), forSong: true, convertRealFactor: -250, associatedEffect: 12,
            promptName: "Song Detune", promptDesc: ["This setting controls the overall detune of the entire song. There is no associated slider.", "At $MID, your song will have no extra detune applied and sound unchanged from default. Each tick corresponds to four cents, or four hundredths of a pitch. Thus, each change of 25 ticks corresponds to one half-step of detune, up to 10 half-steps up at $HI, or 10 half-steps down at $LO.", "[MULTIPLICATIVE] [$LO - $HI] [cents x4]"] },
        { name: "vibrato speed", pianoName: "Vibrato Speed", maxRawVol: 30, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: 9,
            promptName: "Vibrato Speed", promptDesc: ["This setting controls the speed your instrument will vibrato at, just like the slider.", "A setting of $LO means there will be no oscillation, and vibrato will be disabled. Higher settings will increase the speed, up to a dramatic trill at the max value, $HI.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "vibrato delay", pianoName: "Vibrato Delay", maxRawVol: 50, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: 9,
            promptName: "Vibrato Delay", promptDesc: ["This setting controls the amount of time vibrato will be held off for before triggering for every new note, just like the slider.", "A setting of $LO means there will be no delay. A setting of 24 corresponds to one full beat of delay. As a sole exception to this scale, setting delay to $HI will completely disable vibrato (as if it had infinite delay).", "[OVERWRITING] [$LO - $HI] [beats ÷24]"] },
        { name: "arp speed", pianoName: "Arp Speed", maxRawVol: 50, newNoteVol: 10, forSong: false, convertRealFactor: 0, associatedEffect: 11,
            promptName: "Arpeggio Speed", promptDesc: ["This setting controls the speed at which your instrument's chords arpeggiate, just like the arpeggio speed slider.", "Each setting corresponds to a different speed, from the slowest to the fastest. The speeds are listed below.",
                "[0-4]: x0, x1/16, x⅛, x⅕, x¼,", "[5-9]: x⅓, x⅖, x½, x⅔, x¾,", "[10-14]: x⅘, x0.9, x1, x1.1, x1.2,", "[15-19]: x1.3, x1.4, x1.5, x1.6, x1.7,", "[20-24]: x1.8, x1.9, x2, x2.1, x2.2,", "[25-29]: x2.3, x2.4, x2.5, x2.6, x2.7,", "[30-34]: x2.8, x2.9, x3, x3.1, x3.2,", "[35-39]: x3.3, x3.4, x3.5, x3.6, x3.7,", "[40-44]: x3.8, x3.9, x4, x4.15, x4.3,", "[45-50]: x4.5, x4.8, x5, x5.5, x6, x8", "[OVERWRITING] [$LO - $HI]"] },
        { name: "pan delay", pianoName: "Pan Delay", maxRawVol: 20, newNoteVol: 10, forSong: false, convertRealFactor: 0, associatedEffect: 2,
            promptName: "Panning Delay", promptDesc: ["This setting controls the delay applied to panning for your instrument, just like the pan delay slider.", "With more delay, the panning effect will generally be more pronounced. $MID is the default value, whereas $LO will remove any delay at all. No delay can be desirable for chiptune songs.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "reset arp", pianoName: "Reset Arp", maxRawVol: 1, newNoteVol: 1, forSong: false, convertRealFactor: 0, associatedEffect: 11,
            promptName: "Reset Arpeggio", promptDesc: ["This setting functions a little different from most. Wherever a note is placed, the arpeggio of this instrument will reset at the very start of that note. This is most noticeable with lower arpeggio speeds. The lengths and values of notes for this setting don't matter, just the note start times.", "This mod can be used to sync up your apreggios so that they always sound the same, even if you are using an odd-ratio arpeggio speed or modulating arpeggio speed.", "[$LO - $HI]"] },
        { name: "eq filter", pianoName: "EQFlt", maxRawVol: 10, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: 12,
            promptName: "EQ Filter", promptDesc: ["This setting controls a few separate things for your instrument's EQ filter.", "When the option 'morph' is selected, your modulator values will indicate a sub-filter index of your EQ filter to 'morph' to over time. For example, a change from 0 to 1 means your main filter (default) will morph to sub-filter 1 over the specified duration. You can shape the main filter and sub-filters in the large filter editor ('+' button). If your two filters' number, type, and order of filter dots all match up, the morph will happen smoothly and you'll be able to hear them changing. If they do not match up, the filters will simply jump between each other.", "Note that filters will morph based on endpoints in the pattern editor. So, if you specify a morph from sub-filter 1 to 4 but do not specifically drag in new endpoints for 2 and 3, it will morph directly between 1 and 4 without going through the others.", "If you target Dot X or Dot Y, you can finely tune the coordinates of a single dot for your filter. The number of available dots to choose is dependent on your main filter's dot count.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "note filter", pianoName: "N.Flt", maxRawVol: 10, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: 5,
            promptName: "Note Filter", promptDesc: ["This setting controls a few separate things for your instrument's note filter.", "When the option 'morph' is selected, your modulator values will indicate a sub-filter index of your note filter to 'morph' to over time. For example, a change from 0 to 1 means your main filter (default) will morph to sub-filter 1 over the specified duration. You can shape the main filter and sub-filters in the large filter editor ('+' button). If your two filters' number, type, and order of filter dots all match up, the morph will happen smoothly and you'll be able to hear them changing. If they do not match up, the filters will simply jump between each other.", "Note that filters will morph based on endpoints in the pattern editor. So, if you specify a morph from sub-filter 1 to 4 but do not specifically drag in new endpoints for 2 and 3, it will morph directly between 1 and 4 without going through the others.", "If you target Dot X or Dot Y, you can finely tune the coordinates of a single dot for your filter. The number of available dots to choose is dependent on your main filter's dot count.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "bit crush", pianoName: "Bitcrush", maxRawVol: Config.bitcrusherQuantizationRange - 1, newNoteVol: Math.round(Config.bitcrusherQuantizationRange / 2), forSong: false, convertRealFactor: 0, associatedEffect: 4,
            promptName: "Instrument Bit Crush", promptDesc: ["This setting controls the bit crush of your instrument, just like the bit crush slider.", "At a value of $LO, no bit crush will be applied. This increases and the bit crush effect gets more noticeable up to the max value, $HI.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "freq crush", pianoName: "Freq Crush", maxRawVol: Config.bitcrusherFreqRange - 1, newNoteVol: Math.round(Config.bitcrusherFreqRange / 2), forSong: false, convertRealFactor: 0, associatedEffect: 4,
            promptName: "Instrument Frequency Crush", promptDesc: ["This setting controls the frequency crush of your instrument, just like the freq crush slider.", "At a value of $LO, no frequency crush will be applied. This increases and the frequency crush effect gets more noticeable up to the max value, $HI.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "echo", pianoName: "Echo", maxRawVol: Config.echoSustainRange - 1, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: 6,
            promptName: "Instrument Echo Sustain", promptDesc: ["This setting controls the echo sustain (echo loudness) of your instrument, just like the echo slider.", "At $LO, your instrument will have no echo sustain and echo will not be audible. Echo sustain increases and the echo effect gets more noticeable up to the max value, $HI.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "echo delay", pianoName: "Echo Delay", maxRawVol: Config.echoDelayRange, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: 12,
            promptName: "Instrument Echo Delay", promptDesc: ["This setting controls the echo delay of your instrument, just like the echo delay slider.", "At $LO, your instrument will have very little echo delay, and this increases up to 2 beats of delay at $HI.", "[OVERWRITING] [$LO - $HI] [~beats ÷12]"]
        },
        { name: "chorus", pianoName: "Chorus", maxRawVol: Config.chorusRange, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: 1,
            promptName: "Instrument Chorus", promptDesc: ["This setting controls the chorus strength of your instrument, just like the chorus slider.", "At $LO, the chorus effect will be disabled. The strength of the chorus effect increases up to the max value, $HI.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "eq filt cut", pianoName: "EQFlt Cut", maxRawVol: Config.filterSimpleCutRange - 1, newNoteVol: Config.filterSimpleCutRange - 1, forSong: false, convertRealFactor: 0, associatedEffect: 12,
            promptName: "EQ Filter Cutoff Frequency", promptDesc: ["This setting controls the filter cut position of your instrument, just like the filter cut slider.", "This setting is roughly analagous to the horizontal position of a single low-pass dot on the advanced filter editor. At lower values, a wider range of frequencies is cut off.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "eq filt peak", pianoName: "EQFlt Peak", maxRawVol: Config.filterSimplePeakRange - 1, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: 12,
            promptName: "EQ Filter Peak Gain", promptDesc: ["This setting controls the filter peak position of your instrument, just like the filter peak slider.", "This setting is roughly analagous to the vertical position of a single low-pass dot on the advanced filter editor. At lower values, the cutoff frequency will not be emphasized, and at higher values you will hear emphasis on the cutoff frequency.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "note filt cut", pianoName: "N.Flt Cut", maxRawVol: Config.filterSimpleCutRange - 1, newNoteVol: Config.filterSimpleCutRange - 1, forSong: false, convertRealFactor: 0, associatedEffect: 5,
            promptName: "Note Filter Cutoff Frequency", promptDesc: ["This setting controls the filter cut position of your instrument, just like the filter cut slider.", "This setting is roughly analagous to the horizontal position of a single low-pass dot on the advanced filter editor. At lower values, a wider range of frequencies is cut off.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "note filt peak", pianoName: "N.Flt Peak", maxRawVol: Config.filterSimplePeakRange - 1, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: 5,
            promptName: "Note Filter Peak Gain", promptDesc: ["This setting controls the filter peak position of your instrument, just like the filter peak slider.", "This setting is roughly analagous to the vertical position of a single low-pass dot on the advanced filter editor. At lower values, the cutoff frequency will not be emphasized, and at higher values you will hear emphasis on the cutoff frequency.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "pitch shift", pianoName: "Pitch Shift", maxRawVol: Config.pitchShiftRange - 1, newNoteVol: Config.pitchShiftCenter, forSong: false, convertRealFactor: -Config.pitchShiftCenter, associatedEffect: 7,
            promptName: "Pitch Shift", promptDesc: ["This setting controls the pitch offset of your instrument, just like the pitch shift slider.", "At $MID your instrument will have no pitch shift. This increases as you decrease toward $LO pitches (half-steps) at the low end, or increases towards +$HI pitches at the high end.", "[OVERWRITING] [$LO - $HI] [pitch]"] },
        { name: "sustain", pianoName: "Sustain", maxRawVol: Config.stringSustainRange - 1, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: 12,
            promptName: "Picked String Sustain", promptDesc: ["This setting controls the sustain of your picked string instrument, just like the sustain slider.", "At $LO, your instrument will have minimum sustain and sound 'plucky'. This increases to a more held sound as your modulator approaches the maximum, $HI.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "mix volume", pianoName: "Mix Vol.", maxRawVol: Config.volumeRange, newNoteVol: Math.ceil(Config.volumeRange / 2), forSong: false, convertRealFactor: Math.ceil(-Config.volumeRange / 2.0), associatedEffect: 12,
            promptName: "Mix Volume", promptDesc: ["This setting affects the volume of your instrument as if its volume slider had been moved.", "At $MID, an instrument's volume will be unchanged from default. This means you can still use the volume sliders to mix the base volume of instruments, since this setting and the default value work multiplicatively. The volume gradually increases up to $HI, or decreases down to mute at $LO.", "Unlike the 'note volume' setting, mix volume is very straightforward and simply affects the resultant instrument volume after all effects are applied.", "[MULTIPLICATIVE] [$LO - $HI]"] },
    ]);
    function centerWave(wave) {
        let sum = 0.0;
        for (let i = 0; i < wave.length; i++)
            sum += wave[i];
        const average = sum / wave.length;
        for (let i = 0; i < wave.length; i++)
            wave[i] -= average;
        performIntegral(wave);
        wave.push(0);
        return new Float32Array(wave);
    }
    function centerAndNormalizeWave(wave) {
        let magn = 0.0;
        centerWave(wave);
        for (let i = 0; i < wave.length - 1; i++) {
            magn += Math.abs(wave[i]);
        }
        const magnAvg = magn / (wave.length - 1);
        for (let i = 0; i < wave.length - 1; i++) {
            wave[i] = wave[i] / magnAvg;
        }
        return new Float32Array(wave);
    }
    function performIntegral(wave) {
        let cumulative = 0.0;
        let newWave = new Float32Array(wave.length);
        for (let i = 0; i < wave.length; i++) {
            newWave[i] = cumulative;
            cumulative += wave[i];
        }
        return newWave;
    }
    function performIntegralOld(wave) {
        let cumulative = 0.0;
        for (let i = 0; i < wave.length; i++) {
            const temp = wave[i];
            wave[i] = cumulative;
            cumulative += temp;
        }
    }
    function getPulseWidthRatio(pulseWidth) {
        return pulseWidth / (Config.pulseWidthRange * 2);
    }
    function getDrumWave(index, inverseRealFourierTransform, scaleElementsByFactor) {
        let wave = Config.chipNoises[index].samples;
        if (wave == null) {
            wave = new Float32Array(Config.chipNoiseLength + 1);
            Config.chipNoises[index].samples = wave;
            if (index == 0) {
                let drumBuffer = 1;
                for (let i = 0; i < Config.chipNoiseLength; i++) {
                    wave[i] = (drumBuffer & 1) * 2.0 - 1.0;
                    let newBuffer = drumBuffer >> 1;
                    if (((drumBuffer + newBuffer) & 1) == 1) {
                        newBuffer += 1 << 14;
                    }
                    drumBuffer = newBuffer;
                }
            }
            else if (index == 1) {
                for (let i = 0; i < Config.chipNoiseLength; i++) {
                    wave[i] = Math.random() * 2.0 - 1.0;
                }
            }
            else if (index == 2) {
                let drumBuffer = 1;
                for (let i = 0; i < Config.chipNoiseLength; i++) {
                    wave[i] = (drumBuffer & 1) * 2.0 - 1.0;
                    let newBuffer = drumBuffer >> 1;
                    if (((drumBuffer + newBuffer) & 1) == 1) {
                        newBuffer += 2 << 14;
                    }
                    drumBuffer = newBuffer;
                }
            }
            else if (index == 3) {
                let drumBuffer = 1;
                for (let i = 0; i < Config.chipNoiseLength; i++) {
                    wave[i] = (drumBuffer & 1) * 2.0 - 1.0;
                    let newBuffer = drumBuffer >> 1;
                    if (((drumBuffer + newBuffer) & 1) == 1) {
                        newBuffer += 10 << 2;
                    }
                    drumBuffer = newBuffer;
                }
            }
            else if (index == 4) {
                drawNoiseSpectrum(wave, Config.chipNoiseLength, 10, 11, 1, 1, 0);
                drawNoiseSpectrum(wave, Config.chipNoiseLength, 11, 14, .6578, .6578, 0);
                inverseRealFourierTransform(wave, Config.chipNoiseLength);
                scaleElementsByFactor(wave, 1.0 / Math.sqrt(Config.chipNoiseLength));
            }
            else if (index == 5) {
                var drumBuffer = 1;
                for (var i = 0; i < Config.chipNoiseLength; i++) {
                    wave[i] = (drumBuffer & 1) * 2.0 - 1.0;
                    var newBuffer = drumBuffer >> 1;
                    if (((drumBuffer + newBuffer) & 1) == 1) {
                        newBuffer += 10 << 2;
                    }
                    drumBuffer = newBuffer;
                }
            }
            else if (index == 6) {
                drawNoiseSpectrum(wave, Config.chipNoiseLength, 1, 10, 1, 1, 0);
                drawNoiseSpectrum(wave, Config.chipNoiseLength, 20, 14, -2, -2, 0);
                inverseRealFourierTransform(wave, Config.chipNoiseLength);
                scaleElementsByFactor(wave, 1.0 / Math.sqrt(Config.chipNoiseLength));
            }
            else if (index == 7) {
                var drumBuffer = 1;
                for (var i = 0; i < Config.chipNoiseLength; i++) {
                    wave[i] = (drumBuffer & 1) * 4.0 * (Math.random() * 14 + 1);
                    var newBuffer = drumBuffer >> 1;
                    if (((drumBuffer + newBuffer) & 1) == 1) {
                        newBuffer += 15 << 2;
                    }
                    drumBuffer = newBuffer;
                }
            }
            else if (index == 8) {
                var drumBuffer = 1;
                for (var i = 0; i < 32768; i++) {
                    wave[i] = (drumBuffer & 1) / 2.0 + 0.5;
                    var newBuffer = drumBuffer >> 1;
                    if (((drumBuffer + newBuffer) & 1) == 1) {
                        newBuffer -= 10 << 2;
                    }
                    drumBuffer = newBuffer;
                }
            }
            else {
                throw new Error("Unrecognized drum index: " + index);
            }
            wave[Config.chipNoiseLength] = wave[0];
        }
        return wave;
    }
    function drawNoiseSpectrum(wave, waveLength, lowOctave, highOctave, lowPower, highPower, overallSlope) {
        const referenceOctave = 11;
        const referenceIndex = 1 << referenceOctave;
        const lowIndex = Math.pow(2, lowOctave) | 0;
        const highIndex = Math.min(waveLength >> 1, Math.pow(2, highOctave) | 0);
        const retroWave = getDrumWave(0, null, null);
        let combinedAmplitude = 0.0;
        for (let i = lowIndex; i < highIndex; i++) {
            let lerped = lowPower + (highPower - lowPower) * (Math.log2(i) - lowOctave) / (highOctave - lowOctave);
            let amplitude = Math.pow(2, (lerped - 1) * 7 + 1) * lerped;
            amplitude *= Math.pow(i / referenceIndex, overallSlope);
            combinedAmplitude += amplitude;
            amplitude *= retroWave[i];
            const radians = 0.61803398875 * i * i * Math.PI * 2.0;
            wave[i] = Math.cos(radians) * amplitude;
            wave[waveLength - i] = Math.sin(radians) * amplitude;
        }
        return combinedAmplitude;
    }
    function generateSineWave() {
        const wave = new Float32Array(Config.sineWaveLength + 1);
        for (let i = 0; i < Config.sineWaveLength + 1; i++) {
            wave[i] = Math.sin(i * Math.PI * 2.0 / Config.sineWaveLength);
        }
        return wave;
    }
    function generateTriWave() {
        const wave = new Float32Array(Config.sineWaveLength + 1);
        for (let i = 0; i < Config.sineWaveLength + 1; i++) {
            wave[i] = Math.asin(Math.sin(i * Math.PI * 2.0 / Config.sineWaveLength)) / (Math.PI / 2);
        }
        return wave;
    }
    function generateTrapezoidWave(drive = 2) {
        const wave = new Float32Array(Config.sineWaveLength + 1);
        for (let i = 0; i < Config.sineWaveLength + 1; i++) {
            wave[i] = Math.max(-1.0, Math.min(1.0, Math.asin(Math.sin(i * Math.PI * 2.0 / Config.sineWaveLength)) * drive));
        }
        return wave;
    }
    function generateSquareWave(phaseWidth = 0) {
        const wave = new Float32Array(Config.sineWaveLength + 1);
        const centerPoint = Config.sineWaveLength / 4;
        for (let i = 0; i < Config.sineWaveLength + 1; i++) {
            wave[i] = +((Math.abs(i - centerPoint) < phaseWidth * Config.sineWaveLength / 2)
                || ((Math.abs(i - Config.sineWaveLength - centerPoint) < phaseWidth * Config.sineWaveLength / 2))) * 2 - 1;
        }
        return wave;
    }
    function generateSawWave(inverse = false) {
        const wave = new Float32Array(Config.sineWaveLength + 1);
        for (let i = 0; i < Config.sineWaveLength + 1; i++) {
            wave[i] = ((i + (Config.sineWaveLength / 4.0)) * 2.0 / Config.sineWaveLength) % 2 - 1;
            wave[i] = inverse ? -wave[i] : wave[i];
        }
        return wave;
    }
    function getArpeggioPitchIndex(pitchCount, useFastTwoNoteArp, arpeggio) {
        let arpeggioPattern = Config.arpeggioPatterns[pitchCount - 1];
        if (arpeggioPattern != null) {
            if (pitchCount == 2 && useFastTwoNoteArp == false) {
                arpeggioPattern = [0, 0, 1, 1];
            }
            return arpeggioPattern[arpeggio % arpeggioPattern.length];
        }
        else {
            return arpeggio % pitchCount;
        }
    }
    function toNameMap(array) {
        const dictionary = {};
        for (let i = 0; i < array.length; i++) {
            const value = array[i];
            value.index = i;
            dictionary[value.name] = value;
        }
        const result = array;
        result.dictionary = dictionary;
        return result;
    }
    function effectsIncludeTransition(effects) {
        return (effects & (1 << 10)) != 0;
    }
    function effectsIncludeChord(effects) {
        return (effects & (1 << 11)) != 0;
    }
    function effectsIncludePitchShift(effects) {
        return (effects & (1 << 7)) != 0;
    }
    function effectsIncludeDetune(effects) {
        return (effects & (1 << 8)) != 0;
    }
    function effectsIncludeVibrato(effects) {
        return (effects & (1 << 9)) != 0;
    }
    function effectsIncludeNoteFilter(effects) {
        return (effects & (1 << 5)) != 0;
    }
    function effectsIncludeDistortion(effects) {
        return (effects & (1 << 3)) != 0;
    }
    function effectsIncludeBitcrusher(effects) {
        return (effects & (1 << 4)) != 0;
    }
    function effectsIncludePanning(effects) {
        return (effects & (1 << 2)) != 0;
    }
    function effectsIncludeChorus(effects) {
        return (effects & (1 << 1)) != 0;
    }
    function effectsIncludeEcho(effects) {
        return (effects & (1 << 6)) != 0;
    }
    function effectsIncludeReverb(effects) {
        return (effects & (1 << 0)) != 0;
    }
    function rawChipToIntegrated(raw) {
        const newArray = new Array(raw.length);
        const dictionary = {};
        for (let i = 0; i < newArray.length; i++) {
            newArray[i] = Object.assign([], raw[i]);
            const value = newArray[i];
            value.index = i;
            dictionary[value.name] = value;
        }
        for (let key in dictionary) {
            dictionary[key].samples = performIntegral(dictionary[key].samples);
        }
        const result = newArray;
        result.dictionary = dictionary;
        return result;
    }

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|android|ipad|playbook|silk/i.test(navigator.userAgent);
    class EditorConfig {
        static valueToPreset(presetValue) {
            const categoryIndex = presetValue >> 6;
            const presetIndex = presetValue & 0x3F;
            return EditorConfig.presetCategories[categoryIndex].presets[presetIndex];
        }
        static midiProgramToPresetValue(program) {
            for (let categoryIndex = 0; categoryIndex < EditorConfig.presetCategories.length; categoryIndex++) {
                const category = EditorConfig.presetCategories[categoryIndex];
                for (let presetIndex = 0; presetIndex < category.presets.length; presetIndex++) {
                    const preset = category.presets[presetIndex];
                    if (preset.generalMidi && preset.midiProgram == program)
                        return (categoryIndex << 6) + presetIndex;
                }
            }
            return null;
        }
        static nameToPresetValue(presetName) {
            for (let categoryIndex = 0; categoryIndex < EditorConfig.presetCategories.length; categoryIndex++) {
                const category = EditorConfig.presetCategories[categoryIndex];
                for (let presetIndex = 0; presetIndex < category.presets.length; presetIndex++) {
                    const preset = category.presets[presetIndex];
                    if (preset.name == presetName)
                        return (categoryIndex << 6) + presetIndex;
                }
            }
            return null;
        }
    }
    EditorConfig.version = "1.0";
    EditorConfig.versionDisplayName = "Dogebox2 " + EditorConfig.version;
    EditorConfig.releaseNotesURL = "https://dogeiscut.github.io/dogebox2/patch_notes/" + EditorConfig.version + ".html";
    EditorConfig.isOnMac = /^Mac/i.test(navigator.platform) || /Mac OS X/i.test(navigator.userAgent) || /^(iPhone|iPad|iPod)/i.test(navigator.platform) || /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
    EditorConfig.ctrlSymbol = EditorConfig.isOnMac ? "⌘" : "Ctrl+";
    EditorConfig.ctrlName = EditorConfig.isOnMac ? "command" : "control";
    EditorConfig.presetCategories = toNameMap([
        {
            name: "Custom Instruments",
            presets: toNameMap([
                { name: "chip wave", customType: 0 },
                { name: "FM (expert)", customType: 1 },
                { name: "basic noise", customType: 2 },
                { name: "spectrum", customType: 3 },
                { name: "drumset", customType: 4 },
                { name: "harmonics", customType: 5 },
                { name: "pulse width", customType: 6 },
                { name: "picked string", customType: 7 },
                { name: "custom chip", customType: 8 },
            ])
        },
        {
            name: "Retro Presets",
            presets: toNameMap([
                { name: "square wave", midiProgram: 80, settings: { "type": "chip", "eqFilter": [], "effects": ["aliasing"], "transition": "interrupt", "fadeInSeconds": 0, "fadeOutTicks": -1, "chord": "arpeggio", "wave": "square", "unison": "none", "envelopes": [] } },
                { name: "triangle wave", midiProgram: 71, settings: { "type": "chip", "eqFilter": [], "effects": ["aliasing"], "transition": "interrupt", "fadeInSeconds": 0, "fadeOutTicks": -1, "chord": "arpeggio", "wave": "triangle", "unison": "none", "envelopes": [] } },
                { name: "square lead", midiProgram: 80, generalMidi: true, settings: { "type": "chip", "eqFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.3536 }], "effects": ["aliasing"], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "simultaneous", "wave": "square", "unison": "hum", "envelopes": [] } },
                { name: "sawtooth lead 1", midiProgram: 81, generalMidi: true, settings: { "type": "chip", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 0.5 }], "effects": ["aliasing"], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "simultaneous", "wave": "sawtooth", "unison": "shimmer", "envelopes": [] } },
                { name: "sawtooth lead 2", midiProgram: 81, settings: { "type": "chip", "eqFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 1 }], "effects": ["vibrato", "aliasing"], "vibrato": "light", "transition": "normal", "fadeInSeconds": 0.0125, "fadeOutTicks": 72, "chord": "simultaneous", "wave": "sawtooth", "unison": "hum", "envelopes": [] } },
                { name: "chip noise", midiProgram: 116, isNoise: true, settings: { "type": "noise", "transition": "hard", "effects": ["aliasing"], "chord": "arpeggio", "filterCutoffHz": 4000, "filterResonance": 0, "filterEnvelope": "steady", "wave": "retro" } },
                { name: "FM twang", midiProgram: 32, settings: { "type": "FM", "eqFilter": [], "effects": [], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "simultaneous", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "1×", "amplitude": 15 }, { "frequency": "1×", "amplitude": 15 }, { "frequency": "1×", "amplitude": 0 }, { "frequency": "1×", "amplitude": 0 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "twang 2", "index": 1 }] } },
                { name: "FM bass", midiProgram: 36, settings: { "type": "FM", "eqFilter": [], "effects": [], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "custom interval", "algorithm": "1←(2 3←4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "2×", "amplitude": 11 }, { "frequency": "1×", "amplitude": 7 }, { "frequency": "1×", "amplitude": 9 }, { "frequency": "20×", "amplitude": 3 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "twang 2", "index": 1 }, { "target": "operatorAmplitude", "envelope": "twang 3", "index": 2 }, { "target": "operatorAmplitude", "envelope": "twang 2", "index": 3 }] } },
                { name: "FM flute", midiProgram: 73, settings: { "type": "FM", "eqFilter": [], "effects": [], "transition": "normal", "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "chord": "simultaneous", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "1×", "amplitude": 15 }, { "frequency": "1×", "amplitude": 6 }, { "frequency": "1×", "amplitude": 0 }, { "frequency": "1×", "amplitude": 0 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "twang 2", "index": 1 }] } },
                { name: "FM organ", midiProgram: 16, settings: { "type": "FM", "eqFilter": [], "effects": ["vibrato"], "vibrato": "delayed", "transition": "normal", "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "chord": "custom interval", "algorithm": "1←3 2←4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "1×", "amplitude": 14 }, { "frequency": "2×", "amplitude": 14 }, { "frequency": "1×", "amplitude": 11 }, { "frequency": "2×", "amplitude": 11 }], "envelopes": [] } },
                { name: "NES Pulse", midiProgram: 80, settings: { "type": "custom chip", "effects": ["aliasing"], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "arpeggio", "eqFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.5 }], "unison": "none", "vibrato": "none", "envelopes": [], "customChipWave": [-24, -24, -24, -24, -23, -23, -23, -23, -22, -22, -22, -22, -21, -21, -21, -21, -20, -20, -20, -20, -19, -19, -19, -19, -18, -18, -18, -18, -17, -17, -17, -17, 24, 24, 24, 24, 23, 23, 23, 23, 22, 22, 22, 22, 21, 21, 21, 21, 20, 20, 20, 20, 19, 19, 19, 19, 18, 18, 18, 18, 17, 17, 17, 17] } },
                { name: "Gameboy Pulse", midiProgram: 80, settings: { "type": "custom chip", "effects": ["aliasing"], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "arpeggio", "eqFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.5 }], "unison": "none", "envelopes": [], "customChipWave": [-24, -20, -17, -15, -13, -13, -11, -11, -11, -9, -9, -9, -9, -7, -7, -7, -7, -7, -5, -5, -5, -5, -5, -5, -3, -3, -3, -3, -3, -3, -3, -3, 24, 20, 17, 15, 13, 13, 11, 11, 11, 9, 9, 9, 9, 7, 7, 7, 7, 7, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3] } },
                { name: "VRC6 Sawtooth", midiProgram: 81, settings: { "type": "custom chip", "effects": ["aliasing"], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "arpeggio", "eqFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.5 }], "unison": "none", "envelopes": [], "customChipWave": [-24, -20, -16, -13, -10, -8, -6, -5, -4, -4, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 8, 8, 8, 8, 8, 8, 8, 8, 12, 12, 12, 12, 12, 12, 12, 12, 16, 16, 16, 16, 16, 16, 16, 16, 20, 20, 20, 20, 20, 20, 20, 20, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24] } },
                { name: "Atari Square", midiProgram: 80, settings: { "type": "custom chip", "effects": ["aliasing"], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "arpeggio", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 0.5 }], "unison": "none", "envelopes": [], "customChipWave": [-24, -24, -24, -23, -23, -23, -22, -22, -22, -21, -21, -21, -20, -20, -20, -19, -19, -19, -18, -18, -18, -17, -17, -17, -16, -16, -16, -15, -15, -15, -14, -14, -14, -13, -13, -13, 24, 24, 24, 23, 23, 23, 22, 22, 22, 21, 21, 21, 20, 20, 20, 19, 19, 19, 18, 18, 18, 17, 17, 17, 16, 16, 15, 15] } },
                { name: "Atari Bass", midiProgram: 36, settings: { "type": "custom chip", "effects": ["aliasing"], "transition": "interrupt", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "arpeggio", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 0.5 }], "unison": "none", "envelopes": [], "customChipWave": [-24, -24, -24, -24, -24, -24, -24, -24, -24, 24, 24, 24, 24, 24, 24, -24, -24, -24, 24, 24, 24, -24, -24, -24, 24, 24, 24, -24, -24, -24, 24, 24, -24, -24, -24, -24, -24, -24, -24, -24, -24, 24, 24, 24, 24, 24, 24, -24, -24, 24, 24, 24, 24, 24, -24, -24, -24, -24, 24, 24, -24, -24, 24, 24] } },
                { name: "Sunsoft Bass", midiProgram: 36, settings: { "type": "custom chip", "effects": ["aliasing"], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "arpeggio", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 0.5 }], "unison": "none", "envelopes": [], "customChipWave": [24, 24, 15, 15, 9, 9, -4, -4, 0, 0, -13, -13, -19, -19, -24, -24, -24, -24, -10, -10, 0, 0, -7, -7, -7, -7, 0, 0, 6, 6, -4, -4, 3, 3, -4, -4, 3, 3, 3, 3, 9, 9, 15, 15, 15, 15, 6, 6, -4, -4, -4, -4, -4, -4, -4, -4, -4, -4, 3, 3, 12, 12, 24, 24] } },
            ])
        },
        {
            name: "Keyboard Presets",
            presets: toNameMap([
                { name: "grand piano 1", midiProgram: 0, generalMidi: true, settings: { "type": "Picked String", "eqFilter": [{ "type": "high-pass", "cutoffHz": 148.65, "linearGain": 0.7071 }, { "type": "peak", "cutoffHz": 2000, "linearGain": 2.8284 }], "effects": ["note filter", "reverb"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.125 }], "reverb": 67, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "simultaneous", "harmonics": [100, 100, 86, 86, 86, 71, 71, 71, 0, 86, 71, 71, 71, 57, 57, 71, 57, 14, 57, 57, 57, 57, 57, 57, 57, 57, 29, 57], "unison": "piano", "stringSustain": 79, "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "note size" }] } },
                { name: "bright piano", midiProgram: 1, generalMidi: true, settings: { "type": "Picked String", "eqFilter": [{ "type": "low-pass", "cutoffHz": 1681.79, "linearGain": 0.7071 }, { "type": "high-pass", "cutoffHz": 148.65, "linearGain": 0.5 }, { "type": "peak", "cutoffHz": 3363.59, "linearGain": 1.4142 }], "effects": ["reverb"], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 24, "chord": "simultaneous", "harmonics": [100, 100, 86, 86, 71, 71, 0, 71, 71, 71, 71, 71, 71, 14, 57, 57, 57, 57, 57, 57, 29, 57, 57, 57, 57, 57, 57, 57], "unison": "piano", "stringSustain": 86, "envelopes": [] } },
                { name: "electric grand", midiProgram: 2, generalMidi: true, settings: { "type": "chip", "eqFilter": [], "effects": ["note filter"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 2378.41, "linearGain": 0.5 }], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "simultaneous", "wave": "1/8 pulse", "unison": "shimmer", "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 3" }] } },
                { name: "honky-tonk piano", midiProgram: 3, generalMidi: true, settings: { "type": "Picked String", "eqFilter": [{ "type": "low-pass", "cutoffHz": 5656.85, "linearGain": 0.3536 }], "effects": ["reverb"], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "simultaneous", "harmonics": [100, 100, 86, 71, 86, 71, 43, 71, 43, 43, 57, 57, 57, 29, 57, 57, 57, 57, 57, 57, 43, 57, 57, 57, 43, 43, 43, 43], "unison": "honky tonk", "stringSustain": 71, "envelopes": [] } },
                { name: "electric piano 1", midiProgram: 4, generalMidi: true, settings: { "type": "harmonics", "eqFilter": [], "effects": ["note filter"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 3363.59, "linearGain": 0.5 }], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "simultaneous", "harmonics": [86, 100, 100, 71, 71, 57, 57, 43, 43, 43, 29, 29, 29, 14, 14, 14, 0, 0, 0, 0, 0, 57, 0, 0, 0, 0, 0, 0], "unison": "none", "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 2" }] } },
                { name: "electric piano 2", midiProgram: 5, generalMidi: true, settings: { "type": "FM", "eqFilter": [], "effects": ["note filter"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 13454.34, "linearGain": 0.25 }], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "simultaneous", "algorithm": "1←3 2←4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "1×", "amplitude": 12 }, { "frequency": "1×", "amplitude": 6 }, { "frequency": "1×", "amplitude": 9 }, { "frequency": "16×", "amplitude": 6 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 3" }, { "target": "operatorAmplitude", "envelope": "twang 3", "index": 3 }] } },
                { name: "harpsichord", midiProgram: 6, generalMidi: true, settings: { "type": "Picked String", "eqFilter": [{ "type": "high-pass", "cutoffHz": 250, "linearGain": 0.3536 }, { "type": "peak", "cutoffHz": 11313.71, "linearGain": 2.8284 }], "effects": ["reverb"], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 24, "chord": "simultaneous", "harmonics": [100, 100, 100, 86, 57, 86, 86, 86, 86, 57, 57, 71, 71, 86, 86, 71, 71, 86, 86, 71, 71, 71, 71, 71, 71, 71, 71, 71], "unison": "none", "stringSustain": 79, "envelopes": [] } },
                { name: "clavinet", midiProgram: 7, generalMidi: true, settings: { "type": "FM", "eqFilter": [], "effects": ["note filter"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 19027.31, "linearGain": 0.3536 }], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "simultaneous", "algorithm": "1←(2 3 4)", "feedbackType": "3⟲", "feedbackAmplitude": 6, "operators": [{ "frequency": "3×", "amplitude": 15 }, { "frequency": "~1×", "amplitude": 6 }, { "frequency": "8×", "amplitude": 4 }, { "frequency": "1×", "amplitude": 0 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 2" }, { "target": "feedbackAmplitude", "envelope": "twang 2" }] } },
                { name: "dulcimer", midiProgram: 15, generalMidi: true, settings: { "type": "Picked String", "eqFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.3536 }], "effects": ["reverb"], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "strum", "harmonics": [100, 100, 100, 86, 100, 86, 57, 100, 100, 86, 100, 86, 100, 86, 100, 71, 57, 71, 71, 100, 86, 71, 86, 86, 100, 86, 86, 86], "unison": "piano", "stringSustain": 79, "envelopes": [] } },
                { name: "grand piano 2", midiProgram: 0, generalMidi: true, settings: { "type": "harmonics", "eqFilter": [{ "type": "high-pass", "cutoffHz": 148.65, "linearGain": 0.7071 }, { "type": "peak", "cutoffHz": 2000, "linearGain": 2.8284 }], "effects": ["note filter", "reverb"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.125 }], "reverb": 67, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "simultaneous", "harmonics": [100, 86, 86, 86, 86, 71, 71, 57, 0, 57, 29, 43, 57, 57, 57, 43, 43, 0, 29, 43, 43, 43, 43, 43, 43, 29, 0, 29], "unison": "piano", "stringSustain": 79, "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "note size" }] } },
            ])
        },
        {
            name: "Idiophone Presets",
            presets: toNameMap([
                { name: "celesta", midiProgram: 8, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 5657, "filterResonance": 14, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "(1 2)←(3 4)", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "~1×", "amplitude": 11, "envelope": "custom" }, { "frequency": "8×", "amplitude": 6, "envelope": "custom" }, { "frequency": "20×", "amplitude": 3, "envelope": "twang 1" }, { "frequency": "3×", "amplitude": 1, "envelope": "twang 2" }] } },
                { name: "glockenspiel", midiProgram: 9, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 5657, "filterResonance": 14, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "(1 2 3)←4", "feedbackType": "1⟲ 2⟲ 3⟲", "feedbackAmplitude": 2, "feedbackEnvelope": "decay 1", "operators": [{ "frequency": "1×", "amplitude": 7, "envelope": "custom" }, { "frequency": "5×", "amplitude": 11, "envelope": "custom" }, { "frequency": "8×", "amplitude": 7, "envelope": "custom" }, { "frequency": "20×", "amplitude": 2, "envelope": "twang 1" }] } },
                { name: "music box 1", midiProgram: 10, generalMidi: true, settings: { "type": "Picked String", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 0.5 }], "effects": ["reverb"], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "strum", "harmonics": [100, 0, 0, 100, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 86, 0, 0, 0, 0, 0, 0, 71, 0], "unison": "none", "stringSustain": 64, "envelopes": [] } },
                { name: "music box 2", midiProgram: 10, settings: { "type": "Picked String", "eqFilter": [{ "type": "low-pass", "cutoffHz": 2828.43, "linearGain": 0.7071 }], "effects": ["reverb"], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "strum", "harmonics": [100, 57, 57, 0, 0, 0, 0, 0, 0, 57, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 0, 0, 0, 0, 0, 0, 0, 0], "unison": "none", "stringSustain": 29, "envelopes": [] } },
                { name: "vibraphone", midiProgram: 11, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "1 2 3 4", "feedbackType": "1→2→3→4", "feedbackAmplitude": 3, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "1×", "amplitude": 9, "envelope": "custom" }, { "frequency": "~1×", "amplitude": 9, "envelope": "custom" }, { "frequency": "9×", "amplitude": 3, "envelope": "custom" }, { "frequency": "4×", "amplitude": 9, "envelope": "custom" }] } },
                { name: "marimba", midiProgram: 12, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2000, "filterResonance": 29, "filterEnvelope": "decay 1", "vibrato": "none", "algorithm": "1 2←(3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1×", "amplitude": 10, "envelope": "custom" }, { "frequency": "4×", "amplitude": 6, "envelope": "custom" }, { "frequency": "13×", "amplitude": 6, "envelope": "twang 1" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }] } },
                { name: "kalimba", midiProgram: 108, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "decay 1", "vibrato": "none", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1×", "amplitude": 11, "envelope": "custom" }, { "frequency": "5×", "amplitude": 3, "envelope": "twang 2" }, { "frequency": "20×", "amplitude": 3, "envelope": "twang 1" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }] } },
                { name: "xylophone", midiProgram: 13, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "(1 2 3)←4", "feedbackType": "1⟲ 2⟲ 3⟲", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1×", "amplitude": 9, "envelope": "custom" }, { "frequency": "6×", "amplitude": 9, "envelope": "custom" }, { "frequency": "11×", "amplitude": 9, "envelope": "custom" }, { "frequency": "20×", "amplitude": 6, "envelope": "twang 1" }] } },
                { name: "tubular bell", midiProgram: 14, generalMidi: true, midiSubharmonicOctaves: 1, settings: { "type": "Picked String", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 0.5 }, { "type": "high-pass", "cutoffHz": 105.11, "linearGain": 0.3536 }], "effects": ["reverb"], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 96, "chord": "strum", "harmonics": [43, 71, 0, 100, 0, 100, 0, 86, 0, 0, 86, 0, 14, 71, 14, 14, 57, 14, 14, 43, 14, 14, 43, 14, 14, 43, 14, 14], "unison": "shimmer", "stringSustain": 86, "envelopes": [] } },
                { name: "bell synth", midiProgram: 14, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2000, "filterResonance": 29, "filterEnvelope": "twang 3", "vibrato": "none", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "~2×", "amplitude": 10, "envelope": "custom" }, { "frequency": "7×", "amplitude": 6, "envelope": "twang 3" }, { "frequency": "20×", "amplitude": 1, "envelope": "twang 1" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }] } },
                { name: "rain drop", midiProgram: 96, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "(1 2)←(3 4)", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1×", "amplitude": 12, "envelope": "custom" }, { "frequency": "6×", "amplitude": 4, "envelope": "custom" }, { "frequency": "20×", "amplitude": 3, "envelope": "twang 1" }, { "frequency": "1×", "amplitude": 6, "envelope": "tremolo1" }] } },
                { name: "crystal", midiProgram: 98, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 2", "vibrato": "delayed", "algorithm": "1 2 3 4", "feedbackType": "1⟲ 2⟲ 3⟲ 4⟲", "feedbackAmplitude": 4, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "1×", "amplitude": 10, "envelope": "custom" }, { "frequency": "3×", "amplitude": 7, "envelope": "custom" }, { "frequency": "6×", "amplitude": 4, "envelope": "custom" }, { "frequency": "13×", "amplitude": 4, "envelope": "custom" }] } },
                { name: "tinkle bell", midiProgram: 112, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "1 2 3 4", "feedbackType": "1→2→3→4", "feedbackAmplitude": 5, "feedbackEnvelope": "twang 3", "operators": [{ "frequency": "~2×", "amplitude": 7, "envelope": "custom" }, { "frequency": "5×", "amplitude": 7, "envelope": "custom" }, { "frequency": "7×", "amplitude": 7, "envelope": "custom" }, { "frequency": "16×", "amplitude": 7, "envelope": "custom" }] } },
                { name: "agogo", midiProgram: 113, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "decay 1", "vibrato": "none", "algorithm": "1 2 3 4", "feedbackType": "1→4", "feedbackAmplitude": 15, "feedbackEnvelope": "decay 1", "operators": [{ "frequency": "2×", "amplitude": 9, "envelope": "custom" }, { "frequency": "5×", "amplitude": 6, "envelope": "custom" }, { "frequency": "8×", "amplitude": 9, "envelope": "custom" }, { "frequency": "13×", "amplitude": 11, "envelope": "custom" }] } },
            ])
        },
        {
            name: "Guitar Presets",
            presets: toNameMap([
                { name: "nylon guitar", midiProgram: 24, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 5657, "filterResonance": 14, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "1←2←3←4", "feedbackType": "3⟲", "feedbackAmplitude": 6, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "1×", "amplitude": 6, "envelope": "steady" }, { "frequency": "5×", "amplitude": 2, "envelope": "steady" }, { "frequency": "7×", "amplitude": 4, "envelope": "steady" }] } },
                { name: "steel guitar", midiProgram: 25, generalMidi: true, settings: { "type": "Picked String", "eqFilter": [], "effects": ["reverb"], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "strum", "harmonics": [100, 100, 86, 71, 71, 71, 86, 86, 71, 57, 43, 43, 43, 57, 57, 57, 57, 57, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43], "unison": "none", "stringSustain": 71, "envelopes": [] } },
                { name: "jazz guitar", midiProgram: 26, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "twang 2", "interval": "union", "vibrato": "none", "harmonics": [100, 100, 86, 71, 57, 71, 71, 43, 57, 71, 57, 43, 29, 29, 29, 29, 29, 29, 29, 29, 14, 14, 14, 14, 14, 14, 14, 0] } },
                { name: "clean guitar", midiProgram: 27, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 2", "interval": "union", "vibrato": "none", "harmonics": [86, 100, 100, 100, 86, 57, 86, 100, 100, 100, 71, 57, 43, 71, 86, 71, 57, 57, 71, 71, 71, 71, 57, 57, 57, 57, 57, 43] } },
                { name: "muted guitar", midiProgram: 28, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "1←(2 3←4)", "feedbackType": "1⟲", "feedbackAmplitude": 7, "feedbackEnvelope": "twang 2", "operators": [{ "frequency": "1×", "amplitude": 13, "envelope": "custom" }, { "frequency": "1×", "amplitude": 4, "envelope": "twang 3" }, { "frequency": "4×", "amplitude": 4, "envelope": "twang 2" }, { "frequency": "16×", "amplitude": 4, "envelope": "twang 1" }] } },
            ])
        },
        {
            name: "Picked Bass Presets",
            presets: toNameMap([
                { name: "acoustic bass", midiProgram: 32, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "twang 1", "interval": "union", "vibrato": "none", "harmonics": [100, 86, 71, 71, 71, 71, 57, 57, 57, 57, 43, 43, 43, 43, 43, 29, 29, 29, 29, 29, 29, 14, 14, 14, 14, 14, 14, 14] } },
                { name: "fingered bass", midiProgram: 33, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 1", "interval": "union", "vibrato": "none", "harmonics": [100, 86, 71, 57, 71, 43, 57, 29, 29, 29, 29, 29, 29, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 0] } },
                { name: "picked bass", midiProgram: 34, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 0, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "1←(2 3←4)", "feedbackType": "3⟲", "feedbackAmplitude": 4, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "1×", "amplitude": 5, "envelope": "steady" }, { "frequency": "11×", "amplitude": 1, "envelope": "twang 3" }, { "frequency": "1×", "amplitude": 9, "envelope": "steady" }] } },
                { name: "fretless bass", midiProgram: 35, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 1000, "filterResonance": 14, "filterEnvelope": "flare 2", "interval": "union", "vibrato": "none", "harmonics": [100, 100, 86, 71, 71, 57, 57, 71, 71, 71, 57, 57, 57, 57, 57, 57, 57, 43, 43, 43, 43, 43, 43, 43, 43, 29, 29, 14] } },
                { name: "slap bass 1", midiProgram: 36, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 4000, "filterResonance": 0, "filterEnvelope": "twang 1", "interval": "union", "vibrato": "none", "harmonics": [100, 100, 100, 100, 86, 71, 57, 29, 29, 43, 43, 57, 71, 57, 29, 29, 43, 57, 57, 57, 43, 43, 43, 57, 71, 71, 71, 71] } },
                { name: "slap bass 2", midiProgram: 37, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 5657, "filterResonance": 0, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "1←2←3←4", "feedbackType": "3⟲", "feedbackAmplitude": 4, "feedbackEnvelope": "steady", "operators": [{ "frequency": "3×", "amplitude": 13, "envelope": "custom" }, { "frequency": "1×", "amplitude": 7, "envelope": "steady" }, { "frequency": "13×", "amplitude": 3, "envelope": "steady" }, { "frequency": "1×", "amplitude": 11, "envelope": "steady" }] } },
                { name: "bass synth 1", midiProgram: 38, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 4000, "filterResonance": 43, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "1←3 2←4", "feedbackType": "3⟲ 4⟲", "feedbackAmplitude": 9, "feedbackEnvelope": "twang 2", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "1×", "amplitude": 10, "envelope": "custom" }, { "frequency": "1×", "amplitude": 14, "envelope": "twang 1" }, { "frequency": "~1×", "amplitude": 13, "envelope": "twang 2" }] } },
                { name: "bass synth 2", midiProgram: 39, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 1000, "filterResonance": 57, "filterEnvelope": "punch", "vibrato": "none", "algorithm": "1←(2 3 4)", "feedbackType": "1→2", "feedbackAmplitude": 4, "feedbackEnvelope": "twang 3", "operators": [{ "frequency": "1×", "amplitude": 9, "envelope": "custom" }, { "frequency": "1×", "amplitude": 9, "envelope": "steady" }, { "frequency": "3×", "amplitude": 0, "envelope": "steady" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }] } },
                { name: "bass & lead", midiProgram: 87, generalMidi: true, settings: { "type": "chip", "transition": "hard", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 86, "filterEnvelope": "twang 2", "wave": "sawtooth", "interval": "shimmer", "vibrato": "none" } },
                { name: "dubstep yoi yoi", midiProgram: 87, settings: { "type": "chip", "eqFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 0.7071 }], "effects": ["note filter", "bitcrusher"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 594.6, "linearGain": 11.3137 }], "bitcrusherOctave": 1.5, "bitcrusherQuantization": 0, "transition": "slide", "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "chord": "arpeggio", "wave": "sawtooth", "unison": "none", "envelopes": [{ "target": "noteFilterFreq", "envelope": "flare 2", "index": 0 }] } },
            ])
        },
        {
            name: "Picked String Presets",
            presets: toNameMap([
                { name: "pizzicato strings", midiProgram: 45, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "medium fade", "chord": "harmony", "filterCutoffHz": 1000, "filterResonance": 14, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "(1 2 3)←4", "feedbackType": "1⟲ 2⟲ 3⟲ 4⟲", "feedbackAmplitude": 7, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "1×", "amplitude": 14, "envelope": "custom" }, { "frequency": "3×", "amplitude": 11, "envelope": "custom" }, { "frequency": "6×", "amplitude": 9, "envelope": "custom" }, { "frequency": "~1×", "amplitude": 10, "envelope": "steady" }] } },
                { name: "harp", midiProgram: 46, generalMidi: true, settings: { "type": "FM", "transition": "hard fade", "effects": "reverb", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 0, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "1←3 2←4", "feedbackType": "3⟲", "feedbackAmplitude": 6, "feedbackEnvelope": "twang 2", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "4×", "amplitude": 6, "envelope": "custom" }, { "frequency": "~2×", "amplitude": 3, "envelope": "steady" }, { "frequency": "1×", "amplitude": 6, "envelope": "steady" }] } },
                { name: "sitar", midiProgram: 104, generalMidi: true, settings: { "type": "FM", "transition": "hard fade", "effects": "reverb", "chord": "strum", "filterCutoffHz": 8000, "filterResonance": 57, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "1×", "amplitude": 14, "envelope": "twang 3" }, { "frequency": "9×", "amplitude": 3, "envelope": "twang 3" }, { "frequency": "16×", "amplitude": 9, "envelope": "swell 3" }] } },
                { name: "banjo", midiProgram: 105, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "1←(2 3←4)", "feedbackType": "2⟲", "feedbackAmplitude": 4, "feedbackEnvelope": "steady", "operators": [{ "frequency": "4×", "amplitude": 14, "envelope": "custom" }, { "frequency": "1×", "amplitude": 10, "envelope": "steady" }, { "frequency": "11×", "amplitude": 3, "envelope": "twang 3" }, { "frequency": "1×", "amplitude": 11, "envelope": "steady" }] } },
                { name: "ukulele", midiProgram: 105, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2000, "filterResonance": 0, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "1←(2 3←4)", "feedbackType": "3⟲", "feedbackAmplitude": 5, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "2×", "amplitude": 14, "envelope": "custom" }, { "frequency": "1×", "amplitude": 6, "envelope": "steady" }, { "frequency": "9×", "amplitude": 4, "envelope": "twang 2" }, { "frequency": "1×", "amplitude": 11, "envelope": "steady" }] } },
                { name: "shamisen", midiProgram: 106, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 14, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "1←(2 3←4)", "feedbackType": "3⟲", "feedbackAmplitude": 9, "feedbackEnvelope": "twang 3", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "1×", "amplitude": 12, "envelope": "steady" }, { "frequency": "16×", "amplitude": 4, "envelope": "twang 3" }, { "frequency": "1×", "amplitude": 7, "envelope": "steady" }] } },
                { name: "koto", midiProgram: 107, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "1←3 2←4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 5, "feedbackEnvelope": "twang 2", "operators": [{ "frequency": "~1×", "amplitude": 12, "envelope": "custom" }, { "frequency": "6×", "amplitude": 10, "envelope": "custom" }, { "frequency": "4×", "amplitude": 8, "envelope": "twang 3" }, { "frequency": "~2×", "amplitude": 8, "envelope": "twang 3" }] } },
            ])
        },
        {
            name: "Distortion Presets",
            presets: toNameMap([
                { name: "overdrive guitar", midiProgram: 29, generalMidi: true, settings: { "type": "Picked String", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 0.7071 }, { "type": "high-pass", "cutoffHz": 210.22, "linearGain": 1 }, { "type": "low-pass", "cutoffHz": 5656.85, "linearGain": 1 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 0.5 }], "effects": ["note filter", "distortion"], "noteFilter": [{ "type": "high-pass", "cutoffHz": 297.3, "linearGain": 2 }, { "type": "low-pass", "cutoffHz": 2378.41, "linearGain": 0.7071 }], "distortion": 71, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 12, "chord": "strum", "harmonics": [86, 100, 100, 86, 86, 86, 86, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57], "unison": "none", "stringSustain": 71, "envelopes": [{ "target": "noteFilterFreq", "envelope": "note size", "index": 1 }] } },
                { name: "distortion guitar", midiProgram: 30, generalMidi: true, settings: { "type": "Picked String", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 0.7071 }, { "type": "high-pass", "cutoffHz": 210.22, "linearGain": 1 }, { "type": "low-pass", "cutoffHz": 5656.85, "linearGain": 1 }, { "type": "peak", "cutoffHz": 594.6, "linearGain": 0.3536 }, { "type": "peak", "cutoffHz": 1000, "linearGain": 0.25 }], "effects": ["note filter", "distortion", "reverb"], "noteFilter": [{ "type": "high-pass", "cutoffHz": 353.55, "linearGain": 2 }, { "type": "low-pass", "cutoffHz": 2000, "linearGain": 1 }], "distortion": 86, "reverb": 67, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 12, "chord": "strum", "harmonics": [86, 100, 100, 86, 86, 86, 86, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57], "unison": "none", "stringSustain": 71, "envelopes": [{ "target": "noteFilterFreq", "envelope": "note size", "index": 1 }] } },
                { name: "charango synth", midiProgram: 84, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 11313.71, "linearGain": 1 }], "effects": [], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "strum", "algorithm": "1←(2 3←4)", "feedbackType": "1→2→3→4", "feedbackAmplitude": 8, "operators": [{ "frequency": "3×", "amplitude": 13 }, { "frequency": "~1×", "amplitude": 5 }, { "frequency": "4×", "amplitude": 6 }, { "frequency": "3×", "amplitude": 7 }], "envelopes": [{ "target": "feedbackAmplitude", "envelope": "twang 3" }] } },
                { name: "guitar harmonics", midiProgram: 31, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 2 }], "effects": ["reverb"], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "strum", "algorithm": "1←(2 3)←4", "feedbackType": "1⟲", "feedbackAmplitude": 2, "operators": [{ "frequency": "4×", "amplitude": 12 }, { "frequency": "16×", "amplitude": 5 }, { "frequency": "1×", "amplitude": 2 }, { "frequency": "~1×", "amplitude": 12 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "swell 1", "index": 1 }, { "target": "operatorAmplitude", "envelope": "punch", "index": 2 }, { "target": "operatorAmplitude", "envelope": "twang 1", "index": 3 }] } },
                { name: "PWM overdrive", midiProgram: 29, settings: { "type": "PWM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 5656.85, "linearGain": 1.4142 }], "effects": [], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "strum", "pulseWidth": 17.67767, "envelopes": [{ "target": "pulseWidth", "envelope": "punch" }] } },
                { name: "PWM distortion", midiProgram: 30, settings: { "type": "PWM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 3363.59, "linearGain": 2 }], "effects": ["vibrato"], "vibrato": "delayed", "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "strum", "pulseWidth": 50, "envelopes": [{ "target": "pulseWidth", "envelope": "swell 1" }] } },
                { name: "FM overdrive", midiProgram: 29, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 1 }], "effects": ["reverb"], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "strum", "algorithm": "1←(2 3←4)", "feedbackType": "1→2", "feedbackAmplitude": 2, "operators": [{ "frequency": "~1×", "amplitude": 15 }, { "frequency": "1×", "amplitude": 12 }, { "frequency": "~2×", "amplitude": 6 }, { "frequency": "1×", "amplitude": 12 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "twang 1", "index": 2 }, { "target": "operatorAmplitude", "envelope": "swell 3", "index": 3 }, { "target": "feedbackAmplitude", "envelope": "punch" }] } },
                { name: "FM distortion", midiProgram: 30, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 2 }], "effects": ["reverb"], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "strum", "algorithm": "1←(2 3←4)", "feedbackType": "1→2", "feedbackAmplitude": 4, "operators": [{ "frequency": "~1×", "amplitude": 15 }, { "frequency": "1×", "amplitude": 11 }, { "frequency": "1×", "amplitude": 9 }, { "frequency": "~2×", "amplitude": 4 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "swell 1", "index": 2 }, { "target": "operatorAmplitude", "envelope": "swell 3", "index": 3 }] } },
            ])
        },
        {
            name: "Bellows Presets",
            presets: toNameMap([
                { name: "drawbar organ 1", midiProgram: 16, generalMidi: true, midiSubharmonicOctaves: 1, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "steady", "interval": "union", "vibrato": "none", "harmonics": [86, 86, 0, 86, 0, 0, 0, 86, 0, 0, 0, 0, 0, 0, 0, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
                { name: "drawbar organ 2", midiProgram: 16, midiSubharmonicOctaves: 1, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "steady", "interval": "union", "vibrato": "none", "harmonics": [86, 29, 71, 86, 71, 14, 0, 100, 0, 0, 0, 86, 0, 0, 0, 71, 0, 0, 0, 57, 0, 0, 0, 29, 0, 0, 0, 0] } },
                { name: "percussive organ", midiProgram: 17, generalMidi: true, midiSubharmonicOctaves: 1, settings: { "type": "FM", "transition": "hard", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "punch", "vibrato": "light", "algorithm": "1 2 3 4", "feedbackType": "1→3 2→4", "feedbackAmplitude": 7, "feedbackEnvelope": "decay 1", "operators": [{ "frequency": "1×", "amplitude": 7, "envelope": "custom" }, { "frequency": "2×", "amplitude": 7, "envelope": "custom" }, { "frequency": "3×", "amplitude": 8, "envelope": "custom" }, { "frequency": "4×", "amplitude": 8, "envelope": "custom" }] } },
                { name: "rock organ", midiProgram: 18, generalMidi: true, midiSubharmonicOctaves: 1, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "hard", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "punch", "vibrato": "delayed", "algorithm": "(1 2 3)←4", "feedbackType": "1⟲ 2⟲ 3⟲", "feedbackAmplitude": 2, "feedbackEnvelope": "flare 1", "operators": [{ "frequency": "1×", "amplitude": 9, "envelope": "custom" }, { "frequency": "4×", "amplitude": 9, "envelope": "custom" }, { "frequency": "6×", "amplitude": 9, "envelope": "custom" }, { "frequency": "2×", "amplitude": 5, "envelope": "steady" }] } },
                { name: "pipe organ", midiProgram: 19, generalMidi: true, midiSubharmonicOctaves: 1, settings: { "type": "FM", "transition": "cross fade", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1 2 3 4", "feedbackType": "1⟲ 2⟲ 3⟲ 4⟲", "feedbackAmplitude": 5, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1×", "amplitude": 8, "envelope": "custom" }, { "frequency": "2×", "amplitude": 9, "envelope": "custom" }, { "frequency": "4×", "amplitude": 9, "envelope": "custom" }, { "frequency": "8×", "amplitude": 8, "envelope": "custom" }] } },
                { name: "reed organ", midiProgram: 20, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 29, "filterEnvelope": "steady", "interval": "union", "vibrato": "none", "harmonics": [71, 86, 100, 86, 71, 100, 57, 71, 71, 71, 43, 43, 43, 71, 43, 71, 57, 57, 57, 57, 57, 57, 57, 29, 43, 29, 29, 14] } },
                { name: "accordion", midiProgram: 21, generalMidi: true, settings: { "type": "chip", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 0, "filterEnvelope": "swell 1", "wave": "double saw", "interval": "honky tonk", "vibrato": "none" } },
                { name: "bandoneon", midiProgram: 23, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 29, "filterEnvelope": "swell 1", "interval": "hum", "vibrato": "none", "harmonics": [86, 86, 86, 57, 71, 86, 57, 71, 71, 71, 57, 43, 57, 43, 71, 43, 71, 57, 57, 43, 43, 43, 57, 43, 43, 29, 29, 29] } },
                { name: "bagpipe", midiProgram: 109, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 43, "filterEnvelope": "punch", "interval": "hum", "vibrato": "none", "harmonics": [71, 86, 86, 100, 100, 86, 57, 100, 86, 71, 71, 71, 57, 57, 57, 71, 57, 71, 57, 71, 43, 57, 57, 43, 43, 43, 43, 43] } },
            ])
        },
        {
            name: "String Presets",
            presets: toNameMap([
                { name: "violin 1", midiProgram: 40, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 1.4142 }, { "type": "high-pass", "cutoffHz": 105.11, "linearGain": 0.3536 }], "effects": ["vibrato", "reverb"], "vibrato": "delayed", "reverb": 67, "transition": "normal", "fadeInSeconds": 0.0413, "fadeOutTicks": 6, "chord": "simultaneous", "algorithm": "(1 2)←(3 4)", "feedbackType": "1→2", "feedbackAmplitude": 5, "operators": [{ "frequency": "4×", "amplitude": 9 }, { "frequency": "3×", "amplitude": 9 }, { "frequency": "2×", "amplitude": 7 }, { "frequency": "7×", "amplitude": 5 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "swell 1", "index": 3 }, { "target": "feedbackAmplitude", "envelope": "twang 3" }] } },
                { name: "viola", midiProgram: 41, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 29, "filterEnvelope": "steady", "vibrato": "delayed", "algorithm": "(1 2 3)←4", "feedbackType": "1⟲ 2⟲ 3⟲", "feedbackAmplitude": 8, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "2×", "amplitude": 11, "envelope": "custom" }, { "frequency": "7×", "amplitude": 7, "envelope": "custom" }, { "frequency": "13×", "amplitude": 4, "envelope": "custom" }, { "frequency": "1×", "amplitude": 5, "envelope": "steady" }] } },
                { name: "cello", midiProgram: 42, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 0.1768 }, { "type": "high-pass", "cutoffHz": 297.3, "linearGain": 0.7071 }, { "type": "peak", "cutoffHz": 4756.83, "linearGain": 5.6569 }], "effects": ["note filter", "reverb"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 16000, "linearGain": 0.0884 }], "reverb": 67, "transition": "normal", "fadeInSeconds": 0.0125, "fadeOutTicks": 12, "chord": "simultaneous", "algorithm": "(1 2)←3←4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 3, "operators": [{ "frequency": "16×", "amplitude": 5 }, { "frequency": "~1×", "amplitude": 10 }, { "frequency": "1×", "amplitude": 9 }, { "frequency": "6×", "amplitude": 3 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "swell 1" }, { "target": "operatorAmplitude", "envelope": "swell 1", "index": 3 }] } },
                { name: "contrabass", midiProgram: 43, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 29, "filterEnvelope": "steady", "vibrato": "delayed", "algorithm": "(1 2)←3←4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "16×", "amplitude": 5, "envelope": "custom" }, { "frequency": "1×", "amplitude": 10, "envelope": "custom" }, { "frequency": "1×", "amplitude": 10, "envelope": "steady" }, { "frequency": "6×", "amplitude": 3, "envelope": "swell 1" }] } },
                { name: "fiddle", midiProgram: 110, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 29, "filterEnvelope": "steady", "vibrato": "delayed", "algorithm": "(1 2)←(3 4)", "feedbackType": "3⟲ 4⟲", "feedbackAmplitude": 5, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "2×", "amplitude": 10, "envelope": "custom" }, { "frequency": "8×", "amplitude": 8, "envelope": "custom" }, { "frequency": "1×", "amplitude": 8, "envelope": "steady" }, { "frequency": "16×", "amplitude": 3, "envelope": "steady" }] } },
                { name: "tremolo strings", midiProgram: 44, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "medium fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 0, "filterEnvelope": "tremolo4", "vibrato": "none", "algorithm": "1 2 3 4", "feedbackType": "1→2→3→4", "feedbackAmplitude": 12, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1×", "amplitude": 8, "envelope": "custom" }, { "frequency": "~2×", "amplitude": 8, "envelope": "custom" }, { "frequency": "4×", "amplitude": 8, "envelope": "custom" }, { "frequency": "7×", "amplitude": 8, "envelope": "custom" }] } },
                { name: "strings", midiProgram: 48, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "(1 2)←(3 4)", "feedbackType": "4⟲", "feedbackAmplitude": 5, "feedbackEnvelope": "twang 3", "operators": [{ "frequency": "4×", "amplitude": 9, "envelope": "custom" }, { "frequency": "3×", "amplitude": 9, "envelope": "custom" }, { "frequency": "2×", "amplitude": 7, "envelope": "steady" }, { "frequency": "7×", "amplitude": 3, "envelope": "swell 1" }] } },
                { name: "slow strings", midiProgram: 49, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "soft fade", "chord": "harmony", "filterCutoffHz": 1414, "filterResonance": 0, "filterEnvelope": "swell 2", "vibrato": "none", "algorithm": "(1 2)←(3 4)", "feedbackType": "4⟲", "feedbackAmplitude": 6, "feedbackEnvelope": "flare 3", "operators": [{ "frequency": "4×", "amplitude": 10, "envelope": "custom" }, { "frequency": "3×", "amplitude": 10, "envelope": "custom" }, { "frequency": "2×", "amplitude": 7, "envelope": "steady" }, { "frequency": "7×", "amplitude": 4, "envelope": "swell 1" }] } },
                { name: "strings synth 1", midiProgram: 50, generalMidi: true, settings: { "type": "chip", "transition": "soft fade", "effects": "chorus & reverb", "chord": "harmony", "filterCutoffHz": 1414, "filterResonance": 43, "filterEnvelope": "steady", "wave": "sawtooth", "interval": "hum", "vibrato": "delayed" } },
                { name: "strings synth 2", midiProgram: 51, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "soft fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1 2 3 4", "feedbackType": "1⟲ 2⟲ 3⟲ 4⟲", "feedbackAmplitude": 12, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "3×", "amplitude": 6, "envelope": "custom" }, { "frequency": "2×", "amplitude": 7, "envelope": "custom" }, { "frequency": "1×", "amplitude": 8, "envelope": "custom" }, { "frequency": "1×", "amplitude": 9, "envelope": "custom" }] } },
                { name: "orchestra hit 1", midiProgram: 55, generalMidi: true, midiSubharmonicOctaves: 1, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 14, "filterEnvelope": "custom", "vibrato": "none", "algorithm": "1 2 3 4", "feedbackType": "1⟲ 2⟲ 3⟲ 4⟲", "feedbackAmplitude": 14, "feedbackEnvelope": "twang 3", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "twang 3" }, { "frequency": "2×", "amplitude": 15, "envelope": "flare 3" }, { "frequency": "4×", "amplitude": 15, "envelope": "flare 2" }, { "frequency": "8×", "amplitude": 15, "envelope": "flare 1" }] } },
                { name: "violin 2", midiProgram: 40, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 2828, "linearGain": 1.4142 }, { "type": "high-pass", "cutoffHz": 105.11, "linearGain": 0.3536 }], "effects": ["vibrato", "reverb"], "vibrato": "light", "reverb": 67, "transition": "normal", "fadeInSeconds": 0.0413, "fadeOutTicks": 6, "chord": "simultaneous", "algorithm": "(1 2)←(3 4)", "feedbackType": "4⟲", "feedbackAmplitude": 5, "feedbackEnvelope": "twang 3", "operators": [{ "frequency": "4×", "amplitude": 15, "envelope": "custom" }, { "frequency": "3×", "amplitude": 13, "envelope": "custom" }, { "frequency": "2×", "amplitude": 7, "envelope": "steady" }, { "frequency": "7×", "amplitude": 8, "envelope": "swell 1" }] } },
                { name: "orchestra hit 2", midiProgram: 55, midiSubharmonicOctaves: 1, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "medium fade", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 0, "filterEnvelope": "decay 1", "vibrato": "delayed", "algorithm": "1 2 3 4", "feedbackType": "1⟲ 2⟲ 3⟲ 4⟲", "feedbackAmplitude": 14, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1×", "amplitude": 12, "envelope": "custom" }, { "frequency": "2×", "amplitude": 14, "envelope": "custom" }, { "frequency": "3×", "amplitude": 12, "envelope": "custom" }, { "frequency": "4×", "amplitude": 14, "envelope": "custom" }] } },
            ])
        },
        {
            name: "Vocal Presets",
            presets: toNameMap([
                { name: "choir soprano", midiProgram: 94, generalMidi: true, settings: { "type": "harmonics", "eqFilter": [{ "type": "low-pass", "cutoffHz": 2828.43, "linearGain": 2 }, { "type": "peak", "cutoffHz": 1189.21, "linearGain": 5.6569 }, { "type": "high-pass", "cutoffHz": 707.11, "linearGain": 2.8284 }, { "type": "peak", "cutoffHz": 2000, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 0.25 }, { "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 11.3137 }], "effects": ["vibrato", "chorus", "reverb"], "vibrato": "shaky", "chorus": 100, "reverb": 33, "fadeInSeconds": 0.0413, "fadeOutTicks": 24, "harmonics": [100, 100, 86, 57, 29, 29, 57, 71, 57, 29, 14, 14, 14, 29, 43, 57, 43, 29, 14, 14, 14, 14, 14, 14, 0, 0, 0, 0], "unison": "none", "envelopes": [] } },
                { name: "choir tenor", midiProgram: 52, generalMidi: true, settings: { "type": "harmonics", "eqFilter": [{ "type": "peak", "cutoffHz": 1000, "linearGain": 11.3137 }, { "type": "peak", "cutoffHz": 707.11, "linearGain": 5.6569 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 1681.79, "linearGain": 0.0884 }, { "type": "high-pass", "cutoffHz": 297.3, "linearGain": 0.7071 }, { "type": "low-pass", "cutoffHz": 2828.43, "linearGain": 11.3137 }], "effects": ["vibrato", "chorus", "reverb"], "vibrato": "shaky", "chorus": 100, "reverb": 67, "transition": "normal", "fadeInSeconds": 0.0413, "fadeOutTicks": 48, "chord": "simultaneous", "harmonics": [86, 100, 100, 86, 71, 57, 43, 29, 29, 29, 29, 43, 43, 43, 29, 29, 29, 29, 29, 29, 29, 29, 29, 14, 14, 14, 14, 14], "unison": "none", "envelopes": [] } },
                { name: "choir bass", midiProgram: 52, settings: { "type": "harmonics", "eqFilter": [{ "type": "low-pass", "cutoffHz": 2378.41, "linearGain": 11.3137 }, { "type": "peak", "cutoffHz": 594.6, "linearGain": 5.6569 }, { "type": "peak", "cutoffHz": 1681.79, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 707.11, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 11.3137 }], "effects": ["vibrato", "chorus", "reverb"], "vibrato": "shaky", "chorus": 100, "reverb": 67, "transition": "normal", "fadeInSeconds": 0.0413, "fadeOutTicks": 48, "chord": "simultaneous", "harmonics": [71, 86, 100, 100, 86, 86, 57, 43, 29, 29, 29, 29, 29, 29, 43, 43, 43, 43, 43, 29, 29, 29, 29, 14, 14, 14, 14, 14], "unison": "none", "envelopes": [] } },
                { name: "solo soprano", midiProgram: 85, settings: { "type": "harmonics", "eqFilter": [{ "type": "low-pass", "cutoffHz": 2828.43, "linearGain": 2 }, { "type": "peak", "cutoffHz": 1189.21, "linearGain": 5.6569 }, { "type": "high-pass", "cutoffHz": 707.11, "linearGain": 2.8284 }, { "type": "peak", "cutoffHz": 2000, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 0.25 }], "effects": ["vibrato", "reverb"], "vibrato": "shaky", "reverb": 33, "fadeInSeconds": 0.0413, "fadeOutTicks": 12, "harmonics": [86, 100, 86, 43, 14, 14, 57, 71, 57, 14, 14, 14, 14, 14, 43, 57, 43, 14, 14, 14, 14, 14, 14, 14, 0, 0, 0, 0], "unison": "none", "envelopes": [] } },
                { name: "solo tenor", midiProgram: 85, settings: { "type": "harmonics", "eqFilter": [{ "type": "peak", "cutoffHz": 1000, "linearGain": 11.3137 }, { "type": "peak", "cutoffHz": 707.11, "linearGain": 5.6569 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 1681.79, "linearGain": 0.0884 }, { "type": "high-pass", "cutoffHz": 297.3, "linearGain": 0.7071 }, { "type": "low-pass", "cutoffHz": 2828.43, "linearGain": 11.3137 }], "effects": ["vibrato", "reverb"], "vibrato": "shaky", "reverb": 33, "fadeInSeconds": 0.0413, "fadeOutTicks": 12, "harmonics": [86, 100, 100, 86, 71, 57, 43, 29, 29, 29, 29, 43, 43, 43, 29, 29, 29, 29, 29, 29, 29, 29, 29, 14, 14, 14, 14, 14], "unison": "none", "envelopes": [] } },
                { name: "solo bass", midiProgram: 85, settings: { "type": "harmonics", "eqFilter": [{ "type": "low-pass", "cutoffHz": 2378.41, "linearGain": 5.6569 }, { "type": "peak", "cutoffHz": 594.6, "linearGain": 8 }, { "type": "peak", "cutoffHz": 1681.79, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 707.11, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 8 }, { "type": "high-pass", "cutoffHz": 210.22, "linearGain": 1.4142 }], "effects": ["vibrato", "reverb"], "vibrato": "shaky", "reverb": 33, "transition": "normal", "fadeInSeconds": 0.0263, "fadeOutTicks": 12, "chord": "simultaneous", "harmonics": [71, 86, 100, 100, 86, 86, 57, 43, 29, 29, 29, 29, 29, 29, 43, 43, 43, 43, 43, 29, 29, 29, 29, 14, 14, 14, 14, 14], "unison": "none", "envelopes": [] } },
                { name: "voice ooh", midiProgram: 53, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 1414, "filterResonance": 57, "filterEnvelope": "steady", "interval": "union", "vibrato": "shaky", "harmonics": [100, 57, 43, 43, 14, 14, 0, 0, 0, 14, 29, 29, 14, 0, 14, 29, 29, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
                { name: "voice synth", midiProgram: 54, generalMidi: true, settings: { "type": "chip", "transition": "medium fade", "effects": "chorus & reverb", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 57, "filterEnvelope": "steady", "wave": "rounded", "interval": "union", "vibrato": "light" } },
                { name: "vox synth lead", midiProgram: 85, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "steady", "vibrato": "light", "algorithm": "(1 2 3)←4", "feedbackType": "1→2→3→4", "feedbackAmplitude": 2, "feedbackEnvelope": "punch", "operators": [{ "frequency": "2×", "amplitude": 10, "envelope": "custom" }, { "frequency": "9×", "amplitude": 5, "envelope": "custom" }, { "frequency": "20×", "amplitude": 1, "envelope": "custom" }, { "frequency": "~1×", "amplitude": 4, "envelope": "steady" }] } },
                { name: "tiny robot", midiProgram: 85, settings: { "type": "FM", "eqFilter": [], "effects": ["vibrato", "reverb"], "vibrato": "delayed", "reverb": 33, "transition": "slide", "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "chord": "simultaneous", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 2, "operators": [{ "frequency": "2×", "amplitude": 15 }, { "frequency": "1×", "amplitude": 7 }, { "frequency": "~1×", "amplitude": 7 }, { "frequency": "1×", "amplitude": 0 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "punch", "index": 1 }, { "target": "feedbackAmplitude", "envelope": "twang 3" }] } },
                { name: "yowie", midiProgram: 85, settings: { "type": "FM", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 86, "filterEnvelope": "tremolo5", "vibrato": "none", "algorithm": "1←2←(3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 12, "feedbackEnvelope": "tremolo3", "operators": [{ "frequency": "2×", "amplitude": 12, "envelope": "custom" }, { "frequency": "16×", "amplitude": 5, "envelope": "steady" }, { "frequency": "1×", "amplitude": 5, "envelope": "steady" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }] } },
                { name: "mouse", midiProgram: 85, settings: { "type": "FM", "eqFilter": [], "effects": ["vibrato", "reverb"], "vibrato": "light", "reverb": 33, "transition": "slide in pattern", "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "chord": "simultaneous", "algorithm": "1 2 3 4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 5, "operators": [{ "frequency": "2×", "amplitude": 13 }, { "frequency": "5×", "amplitude": 12 }, { "frequency": "1×", "amplitude": 0 }, { "frequency": "1×", "amplitude": 0 }], "envelopes": [{ "target": "noteVolume", "envelope": "note size" }, { "target": "feedbackAmplitude", "envelope": "flare 2" }] } },
                { name: "gumdrop", midiProgram: 85, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 0, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "(1 2 3)←4", "feedbackType": "1⟲ 2⟲ 3⟲", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "2×", "amplitude": 15, "envelope": "punch" }, { "frequency": "4×", "amplitude": 15, "envelope": "punch" }, { "frequency": "7×", "amplitude": 15, "envelope": "punch" }, { "frequency": "1×", "amplitude": 10, "envelope": "twang 1" }] } },
                { name: "echo drop", midiProgram: 102, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "hard", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "punch", "vibrato": "none", "algorithm": "1←(2 3←4)", "feedbackType": "1⟲", "feedbackAmplitude": 2, "feedbackEnvelope": "steady", "operators": [{ "frequency": "~2×", "amplitude": 11, "envelope": "custom" }, { "frequency": "~1×", "amplitude": 5, "envelope": "steady" }, { "frequency": "11×", "amplitude": 2, "envelope": "steady" }, { "frequency": "16×", "amplitude": 5, "envelope": "swell 3" }] } },
                { name: "dark choir", midiProgram: 85, settings: { "type": "spectrum", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 29, "filterEnvelope": "swell 1", "spectrum": [43, 14, 14, 14, 14, 14, 14, 100, 14, 14, 14, 57, 14, 14, 100, 14, 43, 14, 43, 14, 14, 43, 14, 29, 14, 29, 14, 14, 29, 0] } },
            ])
        },
        {
            name: "Brass Presets",
            presets: toNameMap([
                { name: "trumpet", midiProgram: 56, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 9, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1×", "amplitude": 14, "envelope": "custom" }, { "frequency": "1×", "amplitude": 8, "envelope": "steady" }, { "frequency": "1×", "amplitude": 5, "envelope": "flare 2" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }] } },
                { name: "trombone", midiProgram: 57, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1←(2 3 4)", "feedbackType": "2⟲", "feedbackAmplitude": 7, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1×", "amplitude": 14, "envelope": "custom" }, { "frequency": "1×", "amplitude": 8, "envelope": "steady" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }] } },
                { name: "tuba", midiProgram: 58, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1←(2 3 4)", "feedbackType": "2⟲", "feedbackAmplitude": 8, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1×", "amplitude": 14, "envelope": "custom" }, { "frequency": "1×", "amplitude": 6, "envelope": "steady" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }] } },
                { name: "muted trumpet", midiProgram: 59, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 2.8284 }, { "type": "peak", "cutoffHz": 4000, "linearGain": 2.8284 }], "effects": ["note filter", "reverb"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 3363.59, "linearGain": 1 }], "reverb": 33, "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "algorithm": "1←(2 3←4)", "feedbackType": "1⟲", "feedbackAmplitude": 5, "operators": [{ "frequency": "1×", "amplitude": 13 }, { "frequency": "1×", "amplitude": 5 }, { "frequency": "9×", "amplitude": 5 }, { "frequency": "13×", "amplitude": 7 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "swell 1" }, { "target": "operatorAmplitude", "envelope": "swell 1", "index": 3 }, { "target": "feedbackAmplitude", "envelope": "flare 2" }] } },
                { name: "french horn", midiProgram: 60, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 1 }, { "type": "peak", "cutoffHz": 2378.41, "linearGain": 2.8284 }], "effects": ["reverb"], "reverb": 33, "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "algorithm": "1←3 2←4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 3, "operators": [{ "frequency": "1×", "amplitude": 15 }, { "frequency": "1×", "amplitude": 12 }, { "frequency": "1×", "amplitude": 10 }, { "frequency": "~1×", "amplitude": 8 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "swell 1", "index": 2 }, { "target": "operatorAmplitude", "envelope": "flare 2", "index": 3 }, { "target": "feedbackAmplitude", "envelope": "swell 1" }] } },
                { name: "brass section", midiProgram: 61, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "punch", "vibrato": "none", "algorithm": "1←3 2←4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 6, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1×", "amplitude": 14, "envelope": "custom" }, { "frequency": "1×", "amplitude": 12, "envelope": "custom" }, { "frequency": "1×", "amplitude": 10, "envelope": "swell 1" }, { "frequency": "~1×", "amplitude": 10, "envelope": "swell 1" }] } },
                { name: "brass synth 1", midiProgram: 62, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 29, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1←3 2←4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 11, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1×", "amplitude": 14, "envelope": "custom" }, { "frequency": "1×", "amplitude": 14, "envelope": "custom" }, { "frequency": "1×", "amplitude": 12, "envelope": "flare 1" }, { "frequency": "~1×", "amplitude": 8, "envelope": "flare 2" }] } },
                { name: "brass synth 2", midiProgram: 63, generalMidi: true, settings: { "type": "FM", "transition": "soft", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 43, "filterEnvelope": "twang 3", "vibrato": "none", "algorithm": "1←3 2←4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 9, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "1×", "amplitude": 10, "envelope": "flare 1" }, { "frequency": "~1×", "amplitude": 7, "envelope": "flare 1" }] } },
                { name: "pulse brass", midiProgram: 62, settings: { "type": "PWM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 29, "filterEnvelope": "swell 1", "pulseWidth": 50, "pulseEnvelope": "flare 3", "vibrato": "none" } },
            ])
        },
        {
            name: "Reed Presets",
            presets: toNameMap([
                { name: "soprano sax", midiProgram: 64, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 29, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1←2←3←4", "feedbackType": "4⟲", "feedbackAmplitude": 5, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1×", "amplitude": 13, "envelope": "custom" }, { "frequency": "4×", "amplitude": 4, "envelope": "swell 1" }, { "frequency": "1×", "amplitude": 7, "envelope": "steady" }, { "frequency": "5×", "amplitude": 4, "envelope": "punch" }] } },
                { name: "alto sax", midiProgram: 65, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1←(2 3←4)", "feedbackType": "1⟲", "feedbackAmplitude": 4, "feedbackEnvelope": "punch", "operators": [{ "frequency": "1×", "amplitude": 13, "envelope": "custom" }, { "frequency": "1×", "amplitude": 6, "envelope": "steady" }, { "frequency": "4×", "amplitude": 6, "envelope": "swell 1" }, { "frequency": "1×", "amplitude": 12, "envelope": "steady" }] } },
                { name: "tenor sax", midiProgram: 66, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 29, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1←2←3←4", "feedbackType": "1⟲", "feedbackAmplitude": 6, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "2×", "amplitude": 12, "envelope": "custom" }, { "frequency": "3×", "amplitude": 7, "envelope": "steady" }, { "frequency": "1×", "amplitude": 3, "envelope": "steady" }, { "frequency": "8×", "amplitude": 3, "envelope": "steady" }] } },
                { name: "baritone sax", midiProgram: 67, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 0, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1←(2 3←4)", "feedbackType": "1⟲", "feedbackAmplitude": 2, "feedbackEnvelope": "swell 2", "operators": [{ "frequency": "1×", "amplitude": 12, "envelope": "custom" }, { "frequency": "8×", "amplitude": 4, "envelope": "steady" }, { "frequency": "4×", "amplitude": 5, "envelope": "steady" }, { "frequency": "1×", "amplitude": 4, "envelope": "punch" }] } },
                { name: "sax synth", midiProgram: 64, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 0, "filterEnvelope": "steady", "vibrato": "light", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 4, "feedbackEnvelope": "steady", "operators": [{ "frequency": "4×", "amplitude": 15, "envelope": "custom" }, { "frequency": "1×", "amplitude": 15, "envelope": "steady" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }] } },
                { name: "shehnai", midiProgram: 111, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 0, "filterEnvelope": "steady", "vibrato": "light", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 3, "feedbackEnvelope": "steady", "operators": [{ "frequency": "4×", "amplitude": 15, "envelope": "custom" }, { "frequency": "1×", "amplitude": 8, "envelope": "steady" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }] } },
                { name: "oboe", midiProgram: 68, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "swell 1", "vibrato": "none", "algorithm": "1 2←(3 4)", "feedbackType": "2⟲", "feedbackAmplitude": 2, "feedbackEnvelope": "tremolo5", "operators": [{ "frequency": "1×", "amplitude": 7, "envelope": "custom" }, { "frequency": "4×", "amplitude": 12, "envelope": "custom" }, { "frequency": "1×", "amplitude": 6, "envelope": "steady" }, { "frequency": "6×", "amplitude": 2, "envelope": "steady" }] } },
                { name: "english horn", midiProgram: 69, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1 2←(3 4)", "feedbackType": "2⟲", "feedbackAmplitude": 2, "feedbackEnvelope": "steady", "operators": [{ "frequency": "4×", "amplitude": 12, "envelope": "custom" }, { "frequency": "2×", "amplitude": 10, "envelope": "custom" }, { "frequency": "1×", "amplitude": 8, "envelope": "punch" }, { "frequency": "8×", "amplitude": 4, "envelope": "steady" }] } },
                { name: "bassoon", midiProgram: 70, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 707, "filterResonance": 57, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1←(2 3←4)", "feedbackType": "1⟲", "feedbackAmplitude": 2, "feedbackEnvelope": "steady", "operators": [{ "frequency": "2×", "amplitude": 11, "envelope": "custom" }, { "frequency": "1×", "amplitude": 6, "envelope": "steady" }, { "frequency": "6×", "amplitude": 6, "envelope": "swell 1" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }] } },
                { name: "clarinet", midiProgram: 71, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 1414, "filterResonance": 14, "filterEnvelope": "steady", "interval": "union", "vibrato": "none", "harmonics": [100, 43, 86, 57, 86, 71, 86, 71, 71, 71, 71, 71, 71, 43, 71, 71, 57, 57, 57, 57, 57, 57, 43, 43, 43, 29, 14, 0] } },
                { name: "harmonica", midiProgram: 22, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 29, "filterEnvelope": "swell 1", "vibrato": "none", "algorithm": "1←(2 3←4)", "feedbackType": "1⟲", "feedbackAmplitude": 9, "feedbackEnvelope": "tremolo5", "operators": [{ "frequency": "2×", "amplitude": 14, "envelope": "custom" }, { "frequency": "1×", "amplitude": 15, "envelope": "steady" }, { "frequency": "~2×", "amplitude": 2, "envelope": "twang 3" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }] } },
            ])
        },
        {
            name: "Flute Presets",
            presets: toNameMap([
                { name: "flute 1", midiProgram: 73, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 14, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1←(2 3 4)", "feedbackType": "4⟲", "feedbackAmplitude": 7, "feedbackEnvelope": "decay 2", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "2×", "amplitude": 4, "envelope": "steady" }, { "frequency": "1×", "amplitude": 3, "envelope": "steady" }, { "frequency": "~1×", "amplitude": 1, "envelope": "punch" }] } },
                { name: "recorder", midiProgram: 74, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 29, "filterEnvelope": "swell 2", "interval": "union", "vibrato": "none", "harmonics": [100, 43, 57, 43, 57, 43, 43, 43, 43, 43, 43, 43, 43, 29, 29, 29, 29, 29, 29, 29, 14, 14, 14, 14, 14, 14, 14, 0] } },
                { name: "whistle", midiProgram: 78, generalMidi: true, settings: { "type": "harmonics", "effects": "chorus & reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 43, "filterEnvelope": "steady", "interval": "union", "vibrato": "delayed", "harmonics": [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
                { name: "ocarina", midiProgram: 79, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 43, "filterEnvelope": "steady", "interval": "union", "vibrato": "none", "harmonics": [100, 14, 57, 14, 29, 14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
                { name: "piccolo", midiProgram: 72, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1←3 2←4", "feedbackType": "4⟲", "feedbackAmplitude": 15, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "1×", "amplitude": 10, "envelope": "custom" }, { "frequency": "~2×", "amplitude": 3, "envelope": "punch" }, { "frequency": "~1×", "amplitude": 5, "envelope": "punch" }] } },
                { name: "shakuhachi", midiProgram: 77, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "steady", "vibrato": "delayed", "algorithm": "1←(2 3←4)", "feedbackType": "3→4", "feedbackAmplitude": 15, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "2×", "amplitude": 3, "envelope": "punch" }, { "frequency": "~1×", "amplitude": 4, "envelope": "twang 1" }, { "frequency": "20×", "amplitude": 15, "envelope": "steady" }] } },
                { name: "pan flute", midiProgram: 75, generalMidi: true, settings: { "type": "spectrum", "eqFilter": [{ "type": "low-pass", "cutoffHz": 9513.66, "linearGain": 5.6569 }], "effects": ["note filter", "reverb"], "noteFilter": [{ "type": "high-pass", "cutoffHz": 4756.83, "linearGain": 0.7071 }], "reverb": 33, "fadeInSeconds": 0.0125, "fadeOutTicks": -3, "spectrum": [100, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 71, 0, 0, 14, 0, 57, 0, 29, 14, 29, 14, 14, 29, 14, 29, 14, 14, 29, 14], "envelopes": [{ "target": "noteFilterFreq", "envelope": "twang 1", "index": 0 }, { "target": "noteVolume", "envelope": "punch" }] } },
                { name: "blown bottle", midiProgram: 76, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 57, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1 2 3 4", "feedbackType": "1⟲ 2⟲ 3⟲ 4⟲", "feedbackAmplitude": 7, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "3×", "amplitude": 4, "envelope": "custom" }, { "frequency": "6×", "amplitude": 2, "envelope": "custom" }, { "frequency": "11×", "amplitude": 2, "envelope": "custom" }] } },
                { name: "calliope", midiProgram: 82, generalMidi: true, settings: { "type": "spectrum", "transition": "cross fade", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 14, "filterEnvelope": "steady", "spectrum": [100, 0, 0, 0, 0, 0, 0, 86, 0, 0, 0, 71, 0, 0, 57, 0, 43, 0, 29, 14, 14, 29, 14, 14, 14, 14, 14, 14, 14, 14] } },
                { name: "chiffer", midiProgram: 83, generalMidi: true, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "punch", "spectrum": [86, 0, 0, 0, 0, 0, 0, 71, 0, 0, 0, 71, 0, 0, 57, 0, 57, 0, 43, 14, 14, 43, 14, 29, 14, 29, 29, 29, 29, 14] } },
                { name: "breath noise", midiProgram: 121, generalMidi: true, settings: { "type": "spectrum", "eqFilter": [], "effects": ["chord type", "note filter", "reverb"], "chord": "strum", "noteFilter": [{ "type": "high-pass", "cutoffHz": 840.9, "linearGain": 0.3536 }, { "type": "low-pass", "cutoffHz": 16000, "linearGain": 0.3536 }], "reverb": 33, "fadeInSeconds": 0.0413, "fadeOutTicks": 12, "spectrum": [71, 0, 0, 0, 0, 0, 0, 29, 0, 0, 0, 71, 0, 0, 29, 0, 100, 29, 14, 29, 100, 29, 100, 14, 14, 71, 0, 29, 0, 0], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 1" }] } },
                { name: "flute 2", midiProgram: 73, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "seamless", "chord": "harmony", "filterCutoffHz": 1414, "filterResonance": 14, "filterEnvelope": "steady", "interval": "union", "vibrato": "delayed", "harmonics": [100, 43, 86, 57, 86, 71, 86, 71, 71, 71, 71, 71, 71, 43, 71, 71, 57, 57, 57, 57, 57, 57, 43, 43, 43, 29, 14, 0] } },
            ])
        },
        {
            name: "Pad Presets",
            presets: toNameMap([
                { name: "new age pad", midiProgram: 88, generalMidi: true, settings: { "type": "FM", "eqFilter": [], "effects": ["chorus"], "chorus": 100, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "simultaneous", "algorithm": "1←(2 3←4)", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 3, "operators": [{ "frequency": "2×", "amplitude": 14 }, { "frequency": "~1×", "amplitude": 4 }, { "frequency": "6×", "amplitude": 3 }, { "frequency": "13×", "amplitude": 3 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "swell 2", "index": 1 }, { "target": "operatorAmplitude", "envelope": "twang 3", "index": 2 }, { "target": "feedbackAmplitude", "envelope": "swell 3" }] } },
                { name: "warm pad", midiProgram: 89, generalMidi: true, settings: { "type": "FM", "eqFilter": [], "effects": ["note filter", "chorus"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 3363.59, "linearGain": 1 }], "chorus": 100, "transition": "normal", "fadeInSeconds": 0.0575, "fadeOutTicks": 96, "chord": "simultaneous", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 7, "operators": [{ "frequency": "1×", "amplitude": 14 }, { "frequency": "1×", "amplitude": 6 }, { "frequency": "1×", "amplitude": 0 }, { "frequency": "1×", "amplitude": 0 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "swell 3" }, { "target": "operatorAmplitude", "envelope": "swell 1", "index": 1 }] } },
                { name: "polysynth pad", midiProgram: 90, generalMidi: true, settings: { "type": "chip", "eqFilter": [], "effects": ["vibrato", "note filter", "chorus"], "vibrato": "delayed", "noteFilter": [{ "type": "low-pass", "cutoffHz": 2828.43, "linearGain": 1 }], "chorus": 100, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "simultaneous", "wave": "sawtooth", "unison": "honky tonk", "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 3" }] } },
                { name: "space voice pad", midiProgram: 91, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 5.6569 }, { "type": "peak", "cutoffHz": 2828.43, "linearGain": 5.6569 }, { "type": "peak", "cutoffHz": 1414.21, "linearGain": 0.1768 }], "effects": ["chorus"], "chorus": 100, "transition": "normal", "fadeInSeconds": 0.0125, "fadeOutTicks": 72, "chord": "simultaneous", "algorithm": "(1 2 3)←4", "feedbackType": "1⟲ 2⟲ 3⟲ 4⟲", "feedbackAmplitude": 5, "operators": [{ "frequency": "1×", "amplitude": 10 }, { "frequency": "2×", "amplitude": 8 }, { "frequency": "3×", "amplitude": 7 }, { "frequency": "11×", "amplitude": 2 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "punch", "index": 3 }, { "target": "feedbackAmplitude", "envelope": "swell 2" }] } },
                { name: "bowed glass pad", midiProgram: 92, generalMidi: true, settings: { "type": "FM", "eqFilter": [], "effects": ["note filter"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 0.5 }], "transition": "normal", "fadeInSeconds": 0.0575, "fadeOutTicks": 96, "chord": "simultaneous", "algorithm": "1←3 2←4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "1×", "amplitude": 10 }, { "frequency": "2×", "amplitude": 12 }, { "frequency": "3×", "amplitude": 7 }, { "frequency": "7×", "amplitude": 4 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 3" }, { "target": "operatorAmplitude", "envelope": "twang 3", "index": 2 }, { "target": "operatorAmplitude", "envelope": "flare 3", "index": 3 }] } },
                { name: "metallic pad", midiProgram: 93, generalMidi: true, settings: { "type": "FM", "eqFilter": [], "effects": ["note filter"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 0.5 }], "transition": "normal", "fadeInSeconds": 0.0125, "fadeOutTicks": 72, "chord": "simultaneous", "algorithm": "1←3 2←4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 13, "operators": [{ "frequency": "1×", "amplitude": 15 }, { "frequency": "~1×", "amplitude": 9 }, { "frequency": "1×", "amplitude": 7 }, { "frequency": "11×", "amplitude": 7 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 3" }, { "target": "operatorAmplitude", "envelope": "swell 2", "index": 2 }, { "target": "feedbackAmplitude", "envelope": "twang 3" }] } },
                { name: "sweep pad", midiProgram: 95, generalMidi: true, settings: { "type": "chip", "eqFilter": [], "effects": ["note filter", "chorus"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 4 }], "chorus": 100, "transition": "normal", "fadeInSeconds": 0.0575, "fadeOutTicks": 96, "chord": "simultaneous", "wave": "sawtooth", "unison": "hum", "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "flare 3" }] } },
                { name: "atmosphere", midiProgram: 99, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 1 }], "effects": ["chorus", "reverb"], "chorus": 100, "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "strum", "algorithm": "1←(2 3 4)", "feedbackType": "3⟲ 4⟲", "feedbackAmplitude": 3, "operators": [{ "frequency": "1×", "amplitude": 14 }, { "frequency": "~1×", "amplitude": 10 }, { "frequency": "3×", "amplitude": 7 }, { "frequency": "1×", "amplitude": 7 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "swell 3", "index": 1 }, { "target": "operatorAmplitude", "envelope": "twang 2", "index": 2 }, { "target": "operatorAmplitude", "envelope": "twang 3", "index": 3 }] } },
                { name: "brightness", midiProgram: 100, generalMidi: true, settings: { "type": "Picked String", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 2 }], "effects": ["chorus"], "chorus": 100, "transition": "normal", "fadeInSeconds": 0.0125, "fadeOutTicks": 72, "chord": "simultaneous", "harmonics": [100, 86, 86, 86, 43, 57, 43, 71, 43, 43, 43, 57, 43, 43, 57, 71, 57, 43, 29, 43, 57, 57, 43, 29, 29, 29, 29, 14], "unison": "octave", "stringSustain": 86, "envelopes": [] } },
                { name: "goblins", midiProgram: 101, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "peak", "cutoffHz": 2828.43, "linearGain": 11.3137 }], "effects": ["note filter", "chorus"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 1681.79, "linearGain": 0.5 }], "chorus": 100, "transition": "normal", "fadeInSeconds": 0.0575, "fadeOutTicks": 96, "chord": "simultaneous", "algorithm": "1←2←3←4", "feedbackType": "1⟲", "feedbackAmplitude": 10, "operators": [{ "frequency": "1×", "amplitude": 15 }, { "frequency": "4×", "amplitude": 5 }, { "frequency": "1×", "amplitude": 10 }, { "frequency": "1×", "amplitude": 0 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "swell 2" }, { "target": "operatorAmplitude", "envelope": "swell 3", "index": 1 }, { "target": "operatorAmplitude", "envelope": "tremolo1", "index": 2 }, { "target": "feedbackAmplitude", "envelope": "flare 3" }] } },
                { name: "sci-fi", midiProgram: 103, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "peak", "cutoffHz": 9513.66, "linearGain": 2.8284 }], "effects": ["note filter", "chorus"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 0.5 }], "chorus": 100, "transition": "normal", "fadeInSeconds": 0.0125, "fadeOutTicks": 48, "chord": "simultaneous", "algorithm": "(1 2)←3←4", "feedbackType": "1⟲ 2⟲ 3⟲ 4⟲", "feedbackAmplitude": 8, "operators": [{ "frequency": "~1×", "amplitude": 13 }, { "frequency": "2×", "amplitude": 10 }, { "frequency": "5×", "amplitude": 5 }, { "frequency": "11×", "amplitude": 8 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 3" }, { "target": "operatorAmplitude", "envelope": "twang 3", "index": 2 }, { "target": "operatorAmplitude", "envelope": "tremolo5", "index": 3 }, { "target": "feedbackAmplitude", "envelope": "twang 3" }] } },
                { name: "flutter pad", midiProgram: 90, settings: { "type": "FM", "eqFilter": [], "effects": ["vibrato", "note filter", "chorus"], "vibrato": "delayed", "noteFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 4 }], "chorus": 100, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "simultaneous", "algorithm": "(1 2)←(3 4)", "feedbackType": "1⟲ 2⟲ 3⟲", "feedbackAmplitude": 9, "operators": [{ "frequency": "1×", "amplitude": 13 }, { "frequency": "5×", "amplitude": 7 }, { "frequency": "7×", "amplitude": 5 }, { "frequency": "~1×", "amplitude": 6 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 3" }, { "target": "operatorAmplitude", "envelope": "tremolo1", "index": 2 }, { "target": "operatorAmplitude", "envelope": "punch", "index": 3 }] } },
                { name: "feedback pad", midiProgram: 89, settings: { "type": "FM", "eqFilter": [{ "type": "peak", "cutoffHz": 2378.41, "linearGain": 8 }], "effects": [], "transition": "normal", "fadeInSeconds": 0.0575, "fadeOutTicks": 96, "chord": "custom interval", "algorithm": "1 2 3 4", "feedbackType": "1⟲ 2⟲ 3⟲ 4⟲", "feedbackAmplitude": 8, "operators": [{ "frequency": "1×", "amplitude": 15 }, { "frequency": "1×", "amplitude": 15 }, { "frequency": "1×", "amplitude": 15 }, { "frequency": "~1×", "amplitude": 15 }], "envelopes": [{ "target": "feedbackAmplitude", "envelope": "swell 2" }] } },
            ])
        },
        {
            name: "Drum Presets",
            presets: toNameMap([
                { name: "standard drumset", midiProgram: 116, isNoise: true, settings: { "type": "drumset", "effects": "reverb", "drums": [{ "filterEnvelope": "twang 1", "spectrum": [57, 71, 71, 86, 86, 86, 71, 71, 71, 71, 57, 57, 57, 57, 43, 43, 43, 43, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29] }, { "filterEnvelope": "twang 1", "spectrum": [0, 0, 0, 100, 71, 71, 57, 86, 57, 57, 57, 71, 43, 43, 57, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43] }, { "filterEnvelope": "twang 1", "spectrum": [0, 0, 0, 0, 100, 57, 43, 43, 29, 57, 43, 29, 71, 43, 43, 43, 43, 57, 43, 43, 43, 43, 43, 43, 43, 43, 29, 43, 43, 43] }, { "filterEnvelope": "twang 1", "spectrum": [0, 0, 0, 0, 0, 71, 57, 43, 43, 43, 57, 57, 43, 29, 57, 43, 43, 43, 29, 43, 57, 43, 43, 43, 43, 43, 43, 29, 43, 43] }, { "filterEnvelope": "decay 2", "spectrum": [0, 14, 29, 43, 86, 71, 29, 43, 43, 43, 43, 29, 71, 29, 71, 29, 43, 43, 43, 43, 57, 43, 43, 57, 43, 43, 43, 57, 57, 57] }, { "filterEnvelope": "decay 1", "spectrum": [0, 0, 14, 14, 14, 14, 29, 29, 29, 43, 43, 43, 57, 57, 57, 71, 71, 71, 71, 71, 71, 71, 71, 57, 57, 57, 57, 43, 43, 43] }, { "filterEnvelope": "twang 3", "spectrum": [43, 43, 43, 71, 29, 29, 43, 43, 43, 29, 43, 43, 43, 29, 29, 43, 43, 29, 29, 29, 57, 14, 57, 43, 43, 57, 43, 43, 57, 57] }, { "filterEnvelope": "decay 3", "spectrum": [29, 43, 43, 43, 43, 29, 29, 43, 29, 29, 43, 29, 14, 29, 43, 29, 43, 29, 57, 29, 43, 57, 43, 71, 43, 71, 57, 57, 71, 71] }, { "filterEnvelope": "twang 3", "spectrum": [43, 29, 29, 43, 29, 29, 29, 57, 29, 29, 29, 57, 43, 43, 29, 29, 57, 43, 43, 43, 71, 43, 43, 71, 57, 71, 71, 71, 71, 71] }, { "filterEnvelope": "decay 3", "spectrum": [57, 57, 57, 43, 57, 57, 43, 43, 57, 43, 43, 43, 71, 57, 43, 57, 86, 71, 57, 86, 71, 57, 86, 100, 71, 86, 86, 86, 86, 86] }, { "filterEnvelope": "flare 1", "spectrum": [0, 0, 14, 14, 14, 14, 29, 29, 29, 43, 43, 43, 57, 57, 71, 71, 86, 86, 100, 100, 100, 100, 100, 100, 100, 100, 86, 57, 29, 0] }, { "filterEnvelope": "decay 2", "spectrum": [14, 14, 14, 14, 29, 14, 14, 29, 14, 43, 14, 43, 57, 86, 57, 57, 100, 57, 43, 43, 57, 100, 57, 43, 29, 14, 0, 0, 0, 0] }] } },
                { name: "steel pan", midiProgram: 114, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "high-pass", "cutoffHz": 62.5, "linearGain": 0.1768 }], "effects": ["note filter", "chorus", "reverb"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 13454.34, "linearGain": 0.25 }], "chorus": 67, "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 24, "chord": "simultaneous", "algorithm": "1←(2 3←4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "~1×", "amplitude": 14 }, { "frequency": "7×", "amplitude": 3 }, { "frequency": "3×", "amplitude": 5 }, { "frequency": "4×", "amplitude": 4 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "decay 2" }, { "target": "operatorAmplitude", "envelope": "flare 1", "index": 1 }, { "target": "operatorAmplitude", "envelope": "flare 2", "index": 2 }, { "target": "operatorAmplitude", "envelope": "swell 2", "index": 3 }] } },
                { name: "steel pan synth", midiProgram: 114, settings: { "type": "FM", "eqFilter": [], "effects": ["note filter"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 13454.34, "linearGain": 0.25 }], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "simultaneous", "algorithm": "1 2 3←4", "feedbackType": "1⟲", "feedbackAmplitude": 5, "operators": [{ "frequency": "~1×", "amplitude": 12 }, { "frequency": "2×", "amplitude": 15 }, { "frequency": "4×", "amplitude": 14 }, { "frequency": "~1×", "amplitude": 3 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 1" }, { "target": "operatorAmplitude", "envelope": "note size", "index": 0 }, { "target": "operatorAmplitude", "envelope": "note size", "index": 1 }, { "target": "operatorAmplitude", "envelope": "flare 1", "index": 2 }, { "target": "operatorAmplitude", "envelope": "flare 2", "index": 3 }, { "target": "feedbackAmplitude", "envelope": "flare 1" }] } },
                { name: "timpani", midiProgram: 47, generalMidi: true, settings: { "type": "spectrum", "eqFilter": [{ "type": "peak", "cutoffHz": 6727.17, "linearGain": 5.6569 }], "effects": ["pitch shift", "note filter", "reverb"], "pitchShiftSemitones": 15, "noteFilter": [{ "type": "low-pass", "cutoffHz": 19027.31, "linearGain": 0.5 }], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "simultaneous", "spectrum": [100, 0, 0, 0, 86, 0, 0, 71, 0, 14, 43, 14, 43, 43, 0, 29, 43, 29, 29, 29, 43, 29, 43, 29, 43, 43, 43, 43, 43, 43], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 1" }, { "target": "pitchShift", "envelope": "twang 1" }] } },
                { name: "dark strike", midiProgram: 47, settings: { "type": "spectrum", "eqFilter": [], "effects": ["note filter", "reverb"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 0.7071 }], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "simultaneous", "spectrum": [0, 0, 14, 14, 14, 29, 29, 43, 43, 86, 43, 43, 43, 29, 86, 29, 29, 29, 86, 29, 14, 14, 14, 14, 0, 0, 0, 0, 0, 0], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 2" }] } },
                { name: "woodblock", midiProgram: 115, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -2.5, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 1", "spectrum": [0, 14, 29, 43, 43, 57, 86, 86, 71, 57, 57, 43, 43, 57, 86, 86, 43, 43, 71, 57, 57, 57, 57, 57, 86, 86, 71, 71, 71, 71] } },
                { name: "taiko drum", midiProgram: 116, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -0.5, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 29, "filterEnvelope": "twang 1", "spectrum": [71, 100, 100, 43, 43, 71, 71, 43, 43, 43, 43, 43, 43, 57, 29, 57, 43, 57, 43, 43, 57, 43, 43, 43, 43, 43, 43, 43, 43, 43] } },
                { name: "melodic drum", midiProgram: 117, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -1.5, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 43, "filterEnvelope": "twang 1", "spectrum": [100, 71, 71, 57, 57, 43, 43, 71, 43, 43, 43, 57, 43, 43, 57, 43, 43, 43, 43, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29] } },
                { name: "drum synth", midiProgram: 118, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -2, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 43, "filterEnvelope": "decay 1", "spectrum": [100, 86, 71, 57, 43, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29] } },
                { name: "tom-tom", midiProgram: 116, isNoise: true, midiSubharmonicOctaves: -1, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "twang 1", "spectrum": [100, 29, 14, 0, 0, 86, 14, 43, 29, 86, 29, 14, 29, 57, 43, 43, 43, 43, 57, 43, 43, 43, 29, 57, 43, 43, 43, 43, 43, 43] } },
                { name: "metal pipe", midiProgram: 117, isNoise: true, midiSubharmonicOctaves: -1.5, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 8000, "filterResonance": 14, "filterEnvelope": "twang 2", "spectrum": [29, 43, 86, 43, 43, 43, 43, 43, 100, 29, 14, 14, 100, 14, 14, 0, 0, 0, 0, 0, 14, 29, 29, 14, 0, 0, 14, 29, 0, 0] } },
                { name: "synth kick", midiProgram: 47, settings: { "type": "FM", "eqFilter": [], "effects": [], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -6, "chord": "simultaneous", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "8×", "amplitude": 15 }, { "frequency": "1×", "amplitude": 0 }, { "frequency": "1×", "amplitude": 0 }, { "frequency": "1×", "amplitude": 0 }], "envelopes": [{ "target": "operatorFrequency", "envelope": "twang 1", "index": 0 }, { "target": "noteVolume", "envelope": "twang 2" }] } },
            ])
        },
        {
            name: "Novelty Presets",
            presets: toNameMap([
                { name: "guitar fret noise", midiProgram: 120, generalMidi: true, settings: { "type": "spectrum", "eqFilter": [{ "type": "high-pass", "cutoffHz": 1000, "linearGain": 0.1768 }], "effects": ["note filter"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 5.6569 }], "transition": "normal", "fadeInSeconds": 0.0125, "fadeOutTicks": -3, "chord": "simultaneous", "spectrum": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 29, 14, 0, 0, 43, 0, 43, 0, 71, 43, 0, 57, 0], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "flare 1" }, { "target": "noteVolume", "envelope": "twang 2" }] } },
                { name: "fifth saw lead", midiProgram: 86, generalMidi: true, midiSubharmonicOctaves: 1, settings: { "type": "chip", "eqFilter": [], "effects": ["note filter", "chorus"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 2828.43, "linearGain": 1.4142 }], "chorus": 67, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "simultaneous", "wave": "sawtooth", "unison": "fifth", "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 3" }] } },
                { name: "fifth swell", midiProgram: 86, midiSubharmonicOctaves: 1, settings: { "type": "chip", "eqFilter": [], "effects": ["note filter", "chorus"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 2000, "linearGain": 2 }], "chorus": 100, "transition": "normal", "fadeInSeconds": 0.0125, "fadeOutTicks": 72, "chord": "simultaneous", "wave": "sawtooth", "unison": "fifth", "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "swell 3" }] } },
                { name: "soundtrack", midiProgram: 97, generalMidi: true, settings: { "type": "chip", "eqFilter": [], "effects": ["note filter", "chorus"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 2378.41, "linearGain": 0.5 }], "chorus": 67, "transition": "normal", "fadeInSeconds": 0.0413, "fadeOutTicks": 72, "chord": "simultaneous", "wave": "sawtooth", "unison": "fifth", "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "flare 3" }] } },
                { name: "reverse cymbal", midiProgram: 119, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -3, settings: { "type": "spectrum", "effects": "none", "transition": "soft", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "swell 3", "spectrum": [29, 57, 57, 29, 57, 57, 29, 29, 43, 29, 29, 43, 29, 29, 57, 57, 14, 57, 14, 57, 71, 71, 57, 86, 57, 100, 86, 86, 86, 86] } },
                { name: "seashore", midiProgram: 122, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -3, settings: { "type": "spectrum", "transition": "soft fade", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 0, "filterEnvelope": "swell 3", "spectrum": [14, 14, 29, 29, 43, 43, 43, 57, 57, 57, 57, 57, 57, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 57] } },
                { name: "bird tweet", midiProgram: 123, generalMidi: true, settings: { "type": "harmonics", "eqFilter": [], "effects": ["chord type", "vibrato", "reverb"], "chord": "strum", "vibrato": "heavy", "reverb": 67, "fadeInSeconds": 0.0575, "fadeOutTicks": -6, "harmonics": [0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "unison": "hum", "envelopes": [{ "target": "noteVolume", "envelope": "decay 1" }] } },
                { name: "telephone ring", midiProgram: 124, generalMidi: true, settings: { "type": "FM", "eqFilter": [], "effects": ["note filter"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 5656.85, "linearGain": 1 }], "transition": "normal", "fadeInSeconds": 0.0125, "fadeOutTicks": -3, "chord": "arpeggio", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "2×", "amplitude": 12 }, { "frequency": "1×", "amplitude": 4 }, { "frequency": "20×", "amplitude": 1 }, { "frequency": "1×", "amplitude": 0 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "tremolo4" }, { "target": "operatorAmplitude", "envelope": "tremolo1", "index": 1 }] } },
                { name: "helicopter", midiProgram: 125, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -0.5, settings: { "type": "spectrum", "effects": "reverb", "transition": "seamless", "chord": "arpeggio", "filterCutoffHz": 1414, "filterResonance": 14, "filterEnvelope": "tremolo4", "spectrum": [14, 43, 43, 57, 57, 57, 71, 71, 71, 71, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 71, 71, 71, 71, 71, 71, 71, 57, 57] } },
                { name: "applause", midiProgram: 126, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -3, settings: { "type": "spectrum", "effects": "reverb", "transition": "soft fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "swell 3", "spectrum": [14, 14, 29, 29, 29, 43, 43, 57, 71, 71, 86, 86, 86, 71, 71, 57, 57, 57, 71, 86, 86, 86, 86, 86, 71, 71, 57, 57, 57, 57] } },
                { name: "gunshot", midiProgram: 127, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -2, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 1414, "filterResonance": 29, "filterEnvelope": "twang 1", "spectrum": [14, 29, 43, 43, 57, 57, 57, 71, 71, 71, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 71, 71, 71, 71, 57, 57, 57, 57, 43] } },
                { name: "scoot", midiProgram: 92, settings: { "type": "chip", "eqFilter": [], "effects": ["note filter"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 707.11, "linearGain": 4 }], "transition": "normal", "fadeInSeconds": 0.0125, "fadeOutTicks": -3, "chord": "simultaneous", "wave": "double saw", "unison": "shimmer", "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "flare 1" }] } },
                { name: "buzz saw", midiProgram: 30, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 9513.66, "linearGain": 0.5 }], "effects": [], "transition": "normal", "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "chord": "custom interval", "algorithm": "1←2←3←4", "feedbackType": "1⟲", "feedbackAmplitude": 4, "operators": [{ "frequency": "5×", "amplitude": 13 }, { "frequency": "1×", "amplitude": 10 }, { "frequency": "~1×", "amplitude": 6 }, { "frequency": "11×", "amplitude": 12 }], "envelopes": [] } },
                { name: "mosquito", midiProgram: 93, settings: { "type": "PWM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 2828.43, "linearGain": 2 }], "effects": ["vibrato"], "vibrato": "shaky", "transition": "normal", "fadeInSeconds": 0.0575, "fadeOutTicks": -6, "chord": "simultaneous", "pulseWidth": 4.41942, "envelopes": [{ "target": "pulseWidth", "envelope": "tremolo6" }] } },
                { name: "breathing", midiProgram: 126, isNoise: true, midiSubharmonicOctaves: -1, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "swell 2", "spectrum": [14, 14, 14, 29, 29, 29, 29, 29, 43, 29, 29, 43, 43, 43, 29, 29, 71, 43, 86, 86, 57, 100, 86, 86, 86, 86, 71, 86, 71, 57] } },
                { name: "klaxon synth", midiProgram: 125, isNoise: true, midiSubharmonicOctaves: -1, settings: { "type": "noise", "effects": "reverb", "transition": "slide", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 86, "filterEnvelope": "steady", "wave": "buzz" } },
                { name: "theremin", midiProgram: 40, settings: { "type": "harmonics", "eqFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.7071 }], "effects": ["vibrato", "reverb"], "vibrato": "heavy", "reverb": 33, "transition": "slide in pattern", "fadeInSeconds": 0.0263, "fadeOutTicks": -6, "chord": "simultaneous", "harmonics": [100, 71, 57, 43, 29, 29, 14, 14, 14, 14, 14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "unison": "none", "envelopes": [] } },
                { name: "sonar ping", midiProgram: 121, settings: { "type": "spectrum", "eqFilter": [], "effects": ["note filter", "reverb"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 1681.79, "linearGain": 0.5 }], "reverb": 33, "transition": "normal", "fadeInSeconds": 0.0125, "fadeOutTicks": 72, "chord": "simultaneous", "spectrum": [100, 43, 29, 29, 14, 14, 14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 2" }] } },
            ])
        }
    ]);

    function scaleElementsByFactor(array, factor) {
        for (let i = 0; i < array.length; i++) {
            array[i] *= factor;
        }
    }
    function isPowerOf2(n) {
        return !!n && !(n & (n - 1));
    }
    function countBits(n) {
        if (!isPowerOf2(n))
            throw new Error("FFT array length must be a power of 2.");
        return Math.round(Math.log(n) / Math.log(2));
    }
    function reverseIndexBits(array, fullArrayLength) {
        const bitCount = countBits(fullArrayLength);
        if (bitCount > 16)
            throw new Error("FFT array length must not be greater than 2^16.");
        const finalShift = 16 - bitCount;
        for (let i = 0; i < fullArrayLength; i++) {
            let j;
            j = ((i & 0xaaaa) >> 1) | ((i & 0x5555) << 1);
            j = ((j & 0xcccc) >> 2) | ((j & 0x3333) << 2);
            j = ((j & 0xf0f0) >> 4) | ((j & 0x0f0f) << 4);
            j = ((j >> 8) | ((j & 0xff) << 8)) >> finalShift;
            if (j > i) {
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
    }
    function inverseRealFourierTransform(array, fullArrayLength) {
        const totalPasses = countBits(fullArrayLength);
        if (fullArrayLength < 4)
            throw new Error("FFT array length must be at least 4.");
        for (let pass = totalPasses - 1; pass >= 2; pass--) {
            const subStride = 1 << pass;
            const midSubStride = subStride >> 1;
            const stride = subStride << 1;
            const radiansIncrement = Math.PI * 2.0 / stride;
            const cosIncrement = Math.cos(radiansIncrement);
            const sinIncrement = Math.sin(radiansIncrement);
            const oscillatorMultiplier = 2.0 * cosIncrement;
            for (let startIndex = 0; startIndex < fullArrayLength; startIndex += stride) {
                const startIndexA = startIndex;
                const midIndexA = startIndexA + midSubStride;
                const startIndexB = startIndexA + subStride;
                const midIndexB = startIndexB + midSubStride;
                const stopIndex = startIndexB + subStride;
                const realStartA = array[startIndexA];
                const imagStartB = array[startIndexB];
                array[startIndexA] = realStartA + imagStartB;
                array[midIndexA] *= 2;
                array[startIndexB] = realStartA - imagStartB;
                array[midIndexB] *= 2;
                let c = cosIncrement;
                let s = -sinIncrement;
                let cPrev = 1.0;
                let sPrev = 0.0;
                for (let index = 1; index < midSubStride; index++) {
                    const indexA0 = startIndexA + index;
                    const indexA1 = startIndexB - index;
                    const indexB0 = startIndexB + index;
                    const indexB1 = stopIndex - index;
                    const real0 = array[indexA0];
                    const real1 = array[indexA1];
                    const imag0 = array[indexB0];
                    const imag1 = array[indexB1];
                    const tempA = real0 - real1;
                    const tempB = imag0 + imag1;
                    array[indexA0] = real0 + real1;
                    array[indexA1] = imag1 - imag0;
                    array[indexB0] = tempA * c - tempB * s;
                    array[indexB1] = tempB * c + tempA * s;
                    const cTemp = oscillatorMultiplier * c - cPrev;
                    const sTemp = oscillatorMultiplier * s - sPrev;
                    cPrev = c;
                    sPrev = s;
                    c = cTemp;
                    s = sTemp;
                }
            }
        }
        for (let index = 0; index < fullArrayLength; index += 4) {
            const index1 = index + 1;
            const index2 = index + 2;
            const index3 = index + 3;
            const real0 = array[index];
            const real1 = array[index1] * 2;
            const imag2 = array[index2];
            const imag3 = array[index3] * 2;
            const tempA = real0 + imag2;
            const tempB = real0 - imag2;
            array[index] = tempA + real1;
            array[index1] = tempA - real1;
            array[index2] = tempB + imag3;
            array[index3] = tempB - imag3;
        }
        reverseIndexBits(array, fullArrayLength);
    }

    class Deque {
        constructor() {
            this._capacity = 1;
            this._buffer = [undefined];
            this._mask = 0;
            this._offset = 0;
            this._count = 0;
        }
        pushFront(element) {
            if (this._count >= this._capacity)
                this._expandCapacity();
            this._offset = (this._offset - 1) & this._mask;
            this._buffer[this._offset] = element;
            this._count++;
        }
        pushBack(element) {
            if (this._count >= this._capacity)
                this._expandCapacity();
            this._buffer[(this._offset + this._count) & this._mask] = element;
            this._count++;
        }
        popFront() {
            if (this._count <= 0)
                throw new Error("No elements left to pop.");
            const element = this._buffer[this._offset];
            this._buffer[this._offset] = undefined;
            this._offset = (this._offset + 1) & this._mask;
            this._count--;
            return element;
        }
        popBack() {
            if (this._count <= 0)
                throw new Error("No elements left to pop.");
            this._count--;
            const index = (this._offset + this._count) & this._mask;
            const element = this._buffer[index];
            this._buffer[index] = undefined;
            return element;
        }
        peakFront() {
            if (this._count <= 0)
                throw new Error("No elements left to pop.");
            return this._buffer[this._offset];
        }
        peakBack() {
            if (this._count <= 0)
                throw new Error("No elements left to pop.");
            return this._buffer[(this._offset + this._count - 1) & this._mask];
        }
        count() {
            return this._count;
        }
        set(index, element) {
            if (index < 0 || index >= this._count)
                throw new Error("Invalid index");
            this._buffer[(this._offset + index) & this._mask] = element;
        }
        get(index) {
            if (index < 0 || index >= this._count)
                throw new Error("Invalid index");
            return this._buffer[(this._offset + index) & this._mask];
        }
        remove(index) {
            if (index < 0 || index >= this._count)
                throw new Error("Invalid index");
            if (index <= (this._count >> 1)) {
                while (index > 0) {
                    this.set(index, this.get(index - 1));
                    index--;
                }
                this.popFront();
            }
            else {
                index++;
                while (index < this._count) {
                    this.set(index - 1, this.get(index));
                    index++;
                }
                this.popBack();
            }
        }
        _expandCapacity() {
            if (this._capacity >= 0x40000000)
                throw new Error("Capacity too big.");
            this._capacity = this._capacity << 1;
            const oldBuffer = this._buffer;
            const newBuffer = new Array(this._capacity);
            const size = this._count | 0;
            const offset = this._offset | 0;
            for (let i = 0; i < size; i++) {
                newBuffer[i] = oldBuffer[(offset + i) & this._mask];
            }
            for (let i = size; i < this._capacity; i++) {
                newBuffer[i] = undefined;
            }
            this._offset = 0;
            this._buffer = newBuffer;
            this._mask = this._capacity - 1;
        }
    }

    class FilterCoefficients {
        constructor() {
            this.a = [1.0];
            this.b = [1.0];
            this.order = 0;
        }
        linearGain0thOrder(linearGain) {
            this.b[0] = linearGain;
            this.order = 0;
        }
        lowPass1stOrderButterworth(cornerRadiansPerSample) {
            const g = 1.0 / Math.tan(cornerRadiansPerSample * 0.5);
            const a0 = 1.0 + g;
            this.a[1] = (1.0 - g) / a0;
            this.b[1] = this.b[0] = 1 / a0;
            this.order = 1;
        }
        lowPass1stOrderSimplified(cornerRadiansPerSample) {
            const g = 2.0 * Math.sin(cornerRadiansPerSample * 0.5);
            this.a[1] = g - 1.0;
            this.b[0] = g;
            this.b[1] = 0.0;
            this.order = 1;
        }
        highPass1stOrderButterworth(cornerRadiansPerSample) {
            const g = 1.0 / Math.tan(cornerRadiansPerSample * 0.5);
            const a0 = 1.0 + g;
            this.a[1] = (1.0 - g) / a0;
            this.b[0] = g / a0;
            this.b[1] = -g / a0;
            this.order = 1;
        }
        highShelf1stOrder(cornerRadiansPerSample, shelfLinearGain) {
            const tan = Math.tan(cornerRadiansPerSample * 0.5);
            const sqrtGain = Math.sqrt(shelfLinearGain);
            const g = (tan * sqrtGain - 1) / (tan * sqrtGain + 1.0);
            const a0 = 1.0;
            this.a[1] = g / a0;
            this.b[0] = (1.0 + g + shelfLinearGain * (1.0 - g)) / (2.0 * a0);
            this.b[1] = (1.0 + g - shelfLinearGain * (1.0 - g)) / (2.0 * a0);
            this.order = 1;
        }
        allPass1stOrderInvertPhaseAbove(cornerRadiansPerSample) {
            const g = (Math.sin(cornerRadiansPerSample) - 1.0) / Math.cos(cornerRadiansPerSample);
            this.a[1] = g;
            this.b[0] = g;
            this.b[1] = 1.0;
            this.order = 1;
        }
        allPass1stOrderFractionalDelay(delay) {
            const g = (1.0 - delay) / (1.0 + delay);
            this.a[1] = g;
            this.b[0] = g;
            this.b[1] = 1.0;
            this.order = 1;
        }
        lowPass2ndOrderButterworth(cornerRadiansPerSample, peakLinearGain) {
            const alpha = Math.sin(cornerRadiansPerSample) / (2.0 * peakLinearGain);
            const cos = Math.cos(cornerRadiansPerSample);
            const a0 = 1.0 + alpha;
            this.a[1] = -2.0 * cos / a0;
            this.a[2] = (1 - alpha) / a0;
            this.b[2] = this.b[0] = (1 - cos) / (2.0 * a0);
            this.b[1] = (1 - cos) / a0;
            this.order = 2;
        }
        lowPass2ndOrderSimplified(cornerRadiansPerSample, peakLinearGain) {
            const g = 2.0 * Math.sin(cornerRadiansPerSample / 2.0);
            const filterResonance = 1.0 - 1.0 / (2.0 * peakLinearGain);
            const feedback = filterResonance + filterResonance / (1.0 - g);
            this.a[1] = 2.0 * g + (g - 1.0) * g * feedback - 2.0;
            this.a[2] = (g - 1.0) * (g - g * feedback - 1.0);
            this.b[0] = g * g;
            this.b[1] = 0;
            this.b[2] = 0;
            this.order = 2;
        }
        highPass2ndOrderButterworth(cornerRadiansPerSample, peakLinearGain) {
            const alpha = Math.sin(cornerRadiansPerSample) / (2 * peakLinearGain);
            const cos = Math.cos(cornerRadiansPerSample);
            const a0 = 1.0 + alpha;
            this.a[1] = -2.0 * cos / a0;
            this.a[2] = (1.0 - alpha) / a0;
            this.b[2] = this.b[0] = (1.0 + cos) / (2.0 * a0);
            this.b[1] = -(1.0 + cos) / a0;
            this.order = 2;
        }
        peak2ndOrder(cornerRadiansPerSample, peakLinearGain, bandWidthScale) {
            const sqrtGain = Math.sqrt(peakLinearGain);
            const bandWidth = bandWidthScale * cornerRadiansPerSample / (sqrtGain >= 1 ? sqrtGain : 1 / sqrtGain);
            const alpha = Math.tan(bandWidth * 0.5);
            const a0 = 1.0 + alpha / sqrtGain;
            this.b[0] = (1.0 + alpha * sqrtGain) / a0;
            this.b[1] = this.a[1] = -2.0 * Math.cos(cornerRadiansPerSample) / a0;
            this.b[2] = (1.0 - alpha * sqrtGain) / a0;
            this.a[2] = (1.0 - alpha / sqrtGain) / a0;
            this.order = 2;
        }
    }
    class FrequencyResponse {
        constructor() {
            this.real = 0.0;
            this.imag = 0.0;
            this.denom = 1.0;
        }
        analyze(filter, radiansPerSample) {
            this.analyzeComplex(filter, Math.cos(radiansPerSample), Math.sin(radiansPerSample));
        }
        analyzeComplex(filter, real, imag) {
            const a = filter.a;
            const b = filter.b;
            const realZ1 = real;
            const imagZ1 = -imag;
            let realNum = b[0] + b[1] * realZ1;
            let imagNum = b[1] * imagZ1;
            let realDenom = 1.0 + a[1] * realZ1;
            let imagDenom = a[1] * imagZ1;
            let realZ = realZ1;
            let imagZ = imagZ1;
            for (let i = 2; i <= filter.order; i++) {
                const realTemp = realZ * realZ1 - imagZ * imagZ1;
                const imagTemp = realZ * imagZ1 + imagZ * realZ1;
                realZ = realTemp;
                imagZ = imagTemp;
                realNum += b[i] * realZ;
                imagNum += b[i] * imagZ;
                realDenom += a[i] * realZ;
                imagDenom += a[i] * imagZ;
            }
            this.denom = realDenom * realDenom + imagDenom * imagDenom;
            this.real = realNum * realDenom + imagNum * imagDenom;
            this.imag = imagNum * realDenom - realNum * imagDenom;
        }
        magnitude() {
            return Math.sqrt(this.real * this.real + this.imag * this.imag) / this.denom;
        }
        angle() {
            return Math.atan2(this.imag, this.real);
        }
    }
    class DynamicBiquadFilter {
        constructor() {
            this.a1 = 0.0;
            this.a2 = 0.0;
            this.b0 = 1.0;
            this.b1 = 0.0;
            this.b2 = 0.0;
            this.a1Delta = 0.0;
            this.a2Delta = 0.0;
            this.b0Delta = 0.0;
            this.b1Delta = 0.0;
            this.b2Delta = 0.0;
            this.output1 = 0.0;
            this.output2 = 0.0;
            this.useMultiplicativeInputCoefficients = false;
        }
        resetOutput() {
            this.output1 = 0.0;
            this.output2 = 0.0;
        }
        loadCoefficientsWithGradient(start, end, deltaRate, useMultiplicativeInputCoefficients) {
            if (start.order != 2 || end.order != 2)
                throw new Error();
            this.a1 = start.a[1];
            this.a2 = start.a[2];
            this.b0 = start.b[0];
            this.b1 = start.b[1];
            this.b2 = start.b[2];
            this.a1Delta = (end.a[1] - start.a[1]) * deltaRate;
            this.a2Delta = (end.a[2] - start.a[2]) * deltaRate;
            if (useMultiplicativeInputCoefficients) {
                this.b0Delta = Math.pow(end.b[0] / start.b[0], deltaRate);
                this.b1Delta = Math.pow(end.b[1] / start.b[1], deltaRate);
                this.b2Delta = Math.pow(end.b[2] / start.b[2], deltaRate);
            }
            else {
                this.b0Delta = (end.b[0] - start.b[0]) * deltaRate;
                this.b1Delta = (end.b[1] - start.b[1]) * deltaRate;
                this.b2Delta = (end.b[2] - start.b[2]) * deltaRate;
            }
            this.useMultiplicativeInputCoefficients = useMultiplicativeInputCoefficients;
        }
    }

    const epsilon = (1.0e-24);
    function clamp(min, max, val) {
        max = max - 1;
        if (val <= max) {
            if (val >= min)
                return val;
            else
                return min;
        }
        else {
            return max;
        }
    }
    function validateRange(min, max, val) {
        if (min <= val && val <= max)
            return val;
        throw new Error(`Value ${val} not in range [${min}, ${max}]`);
    }
    const base64IntToCharCode = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 45, 95];
    const base64CharCodeToInt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 62, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 0, 0, 0, 0, 63, 0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 0, 0, 0, 0, 0];
    class BitFieldReader {
        constructor(source, startIndex, stopIndex) {
            this._bits = [];
            this._readIndex = 0;
            for (let i = startIndex; i < stopIndex; i++) {
                const value = base64CharCodeToInt[source.charCodeAt(i)];
                this._bits.push((value >> 5) & 0x1);
                this._bits.push((value >> 4) & 0x1);
                this._bits.push((value >> 3) & 0x1);
                this._bits.push((value >> 2) & 0x1);
                this._bits.push((value >> 1) & 0x1);
                this._bits.push(value & 0x1);
            }
        }
        read(bitCount) {
            let result = 0;
            while (bitCount > 0) {
                result = result << 1;
                result += this._bits[this._readIndex++];
                bitCount--;
            }
            return result;
        }
        readLongTail(minValue, minBits) {
            let result = minValue;
            let numBits = minBits;
            while (this._bits[this._readIndex++]) {
                result += 1 << numBits;
                numBits++;
            }
            while (numBits > 0) {
                numBits--;
                if (this._bits[this._readIndex++]) {
                    result += 1 << numBits;
                }
            }
            return result;
        }
        readPartDuration() {
            return this.readLongTail(1, 3);
        }
        readLegacyPartDuration() {
            return this.readLongTail(1, 2);
        }
        readPinCount() {
            return this.readLongTail(1, 0);
        }
        readPitchInterval() {
            if (this.read(1)) {
                return -this.readLongTail(1, 3);
            }
            else {
                return this.readLongTail(1, 3);
            }
        }
    }
    class BitFieldWriter {
        constructor() {
            this._index = 0;
            this._bits = [];
        }
        clear() {
            this._index = 0;
        }
        write(bitCount, value) {
            bitCount--;
            while (bitCount >= 0) {
                this._bits[this._index++] = (value >>> bitCount) & 1;
                bitCount--;
            }
        }
        writeLongTail(minValue, minBits, value) {
            if (value < minValue)
                throw new Error("value out of bounds");
            value -= minValue;
            let numBits = minBits;
            while (value >= (1 << numBits)) {
                this._bits[this._index++] = 1;
                value -= 1 << numBits;
                numBits++;
            }
            this._bits[this._index++] = 0;
            while (numBits > 0) {
                numBits--;
                this._bits[this._index++] = (value >>> numBits) & 1;
            }
        }
        writePartDuration(value) {
            this.writeLongTail(1, 3, value);
        }
        writePinCount(value) {
            this.writeLongTail(1, 0, value);
        }
        writePitchInterval(value) {
            if (value < 0) {
                this.write(1, 1);
                this.writeLongTail(1, 3, -value);
            }
            else {
                this.write(1, 0);
                this.writeLongTail(1, 3, value);
            }
        }
        concat(other) {
            for (let i = 0; i < other._index; i++) {
                this._bits[this._index++] = other._bits[i];
            }
        }
        encodeBase64(buffer) {
            for (let i = 0; i < this._index; i += 6) {
                const value = (this._bits[i] << 5) | (this._bits[i + 1] << 4) | (this._bits[i + 2] << 3) | (this._bits[i + 3] << 2) | (this._bits[i + 4] << 1) | this._bits[i + 5];
                buffer.push(base64IntToCharCode[value]);
            }
            return buffer;
        }
        lengthBase64() {
            return Math.ceil(this._index / 6);
        }
    }
    function makeNotePin(interval, time, size) {
        return { interval: interval, time: time, size: size };
    }
    class Note {
        constructor(pitch, start, end, size, fadeout = false) {
            this.pitches = [pitch];
            this.pins = [makeNotePin(0, 0, size), makeNotePin(0, end - start, fadeout ? 0 : size)];
            this.start = start;
            this.end = end;
            this.continuesLastPattern = false;
        }
        pickMainInterval() {
            let longestFlatIntervalDuration = 0;
            let mainInterval = 0;
            for (let pinIndex = 1; pinIndex < this.pins.length; pinIndex++) {
                const pinA = this.pins[pinIndex - 1];
                const pinB = this.pins[pinIndex];
                if (pinA.interval == pinB.interval) {
                    const duration = pinB.time - pinA.time;
                    if (longestFlatIntervalDuration < duration) {
                        longestFlatIntervalDuration = duration;
                        mainInterval = pinA.interval;
                    }
                }
            }
            if (longestFlatIntervalDuration == 0) {
                let loudestSize = 0;
                for (let pinIndex = 0; pinIndex < this.pins.length; pinIndex++) {
                    const pin = this.pins[pinIndex];
                    if (loudestSize < pin.size) {
                        loudestSize = pin.size;
                        mainInterval = pin.interval;
                    }
                }
            }
            return mainInterval;
        }
        clone() {
            const newNote = new Note(-1, this.start, this.end, 3);
            newNote.pitches = this.pitches.concat();
            newNote.pins = [];
            for (const pin of this.pins) {
                newNote.pins.push(makeNotePin(pin.interval, pin.time, pin.size));
            }
            newNote.continuesLastPattern = this.continuesLastPattern;
            return newNote;
        }
        getEndPinIndex(part) {
            let endPinIndex;
            for (endPinIndex = 1; endPinIndex < this.pins.length - 1; endPinIndex++) {
                if (this.pins[endPinIndex].time + this.start > part)
                    break;
            }
            return endPinIndex;
        }
    }
    class Pattern {
        constructor() {
            this.notes = [];
            this.instruments = [0];
        }
        cloneNotes() {
            const result = [];
            for (const note of this.notes) {
                result.push(note.clone());
            }
            return result;
        }
        reset() {
            this.notes.length = 0;
            this.instruments[0] = 0;
            this.instruments.length = 1;
        }
        toJsonObject(song, channel, isModChannel) {
            const noteArray = [];
            for (const note of this.notes) {
                let instrument = channel.instruments[this.instruments[0]];
                let mod = Math.max(0, Config.modCount - note.pitches[0] - 1);
                let volumeCap = song.getVolumeCapForSetting(isModChannel, instrument.modulators[mod], instrument.modFilterTypes[mod]);
                const pointArray = [];
                for (const pin of note.pins) {
                    let useVol = isModChannel ? Math.round(pin.size) : Math.round(pin.size * 100 / volumeCap);
                    pointArray.push({
                        "tick": (pin.time + note.start) * Config.rhythms[song.rhythm].stepsPerBeat / Config.partsPerBeat,
                        "pitchBend": pin.interval,
                        "volume": useVol,
                        "forMod": isModChannel,
                    });
                }
                const noteObject = {
                    "pitches": note.pitches,
                    "points": pointArray,
                };
                if (note.start == 0) {
                    noteObject["continuesLastPattern"] = note.continuesLastPattern;
                }
                noteArray.push(noteObject);
            }
            const patternObject = { "notes": noteArray };
            if (song.patternInstruments) {
                patternObject["instruments"] = this.instruments.map(i => i + 1);
            }
            return patternObject;
        }
        fromJsonObject(patternObject, song, channel, importedPartsPerBeat, isNoiseChannel, isModChannel) {
            if (song.patternInstruments) {
                if (Array.isArray(patternObject["instruments"])) {
                    const instruments = patternObject["instruments"];
                    const instrumentCount = clamp(Config.instrumentCountMin, song.getMaxInstrumentsPerPatternForChannel(channel) + 1, instruments.length);
                    for (let j = 0; j < instrumentCount; j++) {
                        this.instruments[j] = clamp(0, channel.instruments.length, (instruments[j] | 0) - 1);
                    }
                    this.instruments.length = instrumentCount;
                }
                else {
                    this.instruments[0] = clamp(0, channel.instruments.length, (patternObject["instrument"] | 0) - 1);
                    this.instruments.length = 1;
                }
            }
            if (patternObject["notes"] && patternObject["notes"].length > 0) {
                const maxNoteCount = Math.min(song.beatsPerBar * Config.partsPerBeat * (isModChannel ? Config.modCount : 1), patternObject["notes"].length >>> 0);
                for (let j = 0; j < patternObject["notes"].length; j++) {
                    if (j >= maxNoteCount)
                        break;
                    const noteObject = patternObject["notes"][j];
                    if (!noteObject || !noteObject["pitches"] || !(noteObject["pitches"].length >= 1) || !noteObject["points"] || !(noteObject["points"].length >= 2)) {
                        continue;
                    }
                    const note = new Note(0, 0, 0, 0);
                    note.pitches = [];
                    note.pins = [];
                    for (let k = 0; k < noteObject["pitches"].length; k++) {
                        const pitch = noteObject["pitches"][k] | 0;
                        if (note.pitches.indexOf(pitch) != -1)
                            continue;
                        note.pitches.push(pitch);
                        if (note.pitches.length >= Config.maxChordSize)
                            break;
                    }
                    if (note.pitches.length < 1)
                        continue;
                    let startInterval = 0;
                    for (let k = 0; k < noteObject["points"].length; k++) {
                        const pointObject = noteObject["points"][k];
                        if (pointObject == undefined || pointObject["tick"] == undefined)
                            continue;
                        const interval = (pointObject["pitchBend"] == undefined) ? 0 : (pointObject["pitchBend"] | 0);
                        const time = Math.round((+pointObject["tick"]) * Config.partsPerBeat / importedPartsPerBeat);
                        let instrument = channel.instruments[this.instruments[0]];
                        let mod = Math.max(0, Config.modCount - note.pitches[0] - 1);
                        let volumeCap = song.getVolumeCapForSetting(isModChannel, instrument.modulators[mod], instrument.modFilterTypes[mod]);
                        let size;
                        if (pointObject["volume"] == undefined) {
                            size = volumeCap;
                        }
                        else if (pointObject["forMod"] == undefined) {
                            size = Math.max(0, Math.min(volumeCap, Math.round((pointObject["volume"] | 0) * volumeCap / 100)));
                        }
                        else {
                            size = ((pointObject["forMod"] | 0) > 0) ? Math.round(pointObject["volume"] | 0) : Math.max(0, Math.min(volumeCap, Math.round((pointObject["volume"] | 0) * volumeCap / 100)));
                        }
                        if (time > song.beatsPerBar * Config.partsPerBeat)
                            continue;
                        if (note.pins.length == 0) {
                            note.start = time;
                            startInterval = interval;
                        }
                        note.pins.push(makeNotePin(interval - startInterval, time - note.start, size));
                    }
                    if (note.pins.length < 2)
                        continue;
                    note.end = note.pins[note.pins.length - 1].time + note.start;
                    const maxPitch = isNoiseChannel ? Config.drumCount - 1 : Config.maxPitch;
                    let lowestPitch = maxPitch;
                    let highestPitch = 0;
                    for (let k = 0; k < note.pitches.length; k++) {
                        note.pitches[k] += startInterval;
                        if (note.pitches[k] < 0 || note.pitches[k] > maxPitch) {
                            note.pitches.splice(k, 1);
                            k--;
                        }
                        if (note.pitches[k] < lowestPitch)
                            lowestPitch = note.pitches[k];
                        if (note.pitches[k] > highestPitch)
                            highestPitch = note.pitches[k];
                    }
                    if (note.pitches.length < 1)
                        continue;
                    for (let k = 0; k < note.pins.length; k++) {
                        const pin = note.pins[k];
                        if (pin.interval + lowestPitch < 0)
                            pin.interval = -lowestPitch;
                        if (pin.interval + highestPitch > maxPitch)
                            pin.interval = maxPitch - highestPitch;
                        if (k >= 2) {
                            if (pin.interval == note.pins[k - 1].interval &&
                                pin.interval == note.pins[k - 2].interval &&
                                pin.size == note.pins[k - 1].size &&
                                pin.size == note.pins[k - 2].size) {
                                note.pins.splice(k - 1, 1);
                                k--;
                            }
                        }
                    }
                    if (note.start == 0) {
                        note.continuesLastPattern = (noteObject["continuesLastPattern"] === true);
                    }
                    else {
                        note.continuesLastPattern = false;
                    }
                    this.notes.push(note);
                }
            }
        }
    }
    class Operator {
        constructor(index) {
            this.frequency = 0;
            this.amplitude = 0;
            this.waveform = 0;
            this.pulseWidth = 0.5;
            this.reset(index);
        }
        reset(index) {
            this.frequency = 0;
            this.amplitude = (index <= 1) ? Config.operatorAmplitudeMax : 0;
            this.waveform = 0;
            this.pulseWidth = 5;
        }
        copy(other) {
            this.frequency = other.frequency;
            this.amplitude = other.amplitude;
            this.waveform = other.waveform;
            this.pulseWidth = other.pulseWidth;
        }
    }
    class SpectrumWave {
        constructor(isNoiseChannel) {
            this.spectrum = [];
            this.hash = -1;
            this.reset(isNoiseChannel);
        }
        reset(isNoiseChannel) {
            for (let i = 0; i < Config.spectrumControlPoints; i++) {
                if (isNoiseChannel) {
                    this.spectrum[i] = Math.round(Config.spectrumMax * (1 / Math.sqrt(1 + i / 3)));
                }
                else {
                    const isHarmonic = i == 0 || i == 7 || i == 11 || i == 14 || i == 16 || i == 18 || i == 21 || i == 23 || i >= 25;
                    this.spectrum[i] = isHarmonic ? Math.max(0, Math.round(Config.spectrumMax * (1 - i / 30))) : 0;
                }
            }
            this.markCustomWaveDirty();
        }
        markCustomWaveDirty() {
            const hashMult = Synth.fittingPowerOfTwo(Config.spectrumMax + 2) - 1;
            let hash = 0;
            for (const point of this.spectrum)
                hash = ((hash * hashMult) + point) >>> 0;
            this.hash = hash;
        }
    }
    class SpectrumWaveState {
        constructor() {
            this.wave = null;
            this._hash = -1;
        }
        getCustomWave(settings, lowestOctave) {
            if (this._hash == settings.hash)
                return this.wave;
            this._hash = settings.hash;
            const waveLength = Config.spectrumNoiseLength;
            if (this.wave == null || this.wave.length != waveLength + 1) {
                this.wave = new Float32Array(waveLength + 1);
            }
            const wave = this.wave;
            for (let i = 0; i < waveLength; i++) {
                wave[i] = 0;
            }
            const highestOctave = 14;
            const falloffRatio = 0.25;
            const pitchTweak = [0, 1 / 7, Math.log2(5 / 4), 3 / 7, Math.log2(3 / 2), 5 / 7, 6 / 7];
            function controlPointToOctave(point) {
                return lowestOctave + Math.floor(point / Config.spectrumControlPointsPerOctave) + pitchTweak[(point + Config.spectrumControlPointsPerOctave) % Config.spectrumControlPointsPerOctave];
            }
            let combinedAmplitude = 1;
            for (let i = 0; i < Config.spectrumControlPoints + 1; i++) {
                const value1 = (i <= 0) ? 0 : settings.spectrum[i - 1];
                const value2 = (i >= Config.spectrumControlPoints) ? settings.spectrum[Config.spectrumControlPoints - 1] : settings.spectrum[i];
                const octave1 = controlPointToOctave(i - 1);
                let octave2 = controlPointToOctave(i);
                if (i >= Config.spectrumControlPoints)
                    octave2 = highestOctave + (octave2 - highestOctave) * falloffRatio;
                if (value1 == 0 && value2 == 0)
                    continue;
                combinedAmplitude += 0.02 * drawNoiseSpectrum(wave, waveLength, octave1, octave2, value1 / Config.spectrumMax, value2 / Config.spectrumMax, -0.5);
            }
            if (settings.spectrum[Config.spectrumControlPoints - 1] > 0) {
                combinedAmplitude += 0.02 * drawNoiseSpectrum(wave, waveLength, highestOctave + (controlPointToOctave(Config.spectrumControlPoints) - highestOctave) * falloffRatio, highestOctave, settings.spectrum[Config.spectrumControlPoints - 1] / Config.spectrumMax, 0, -0.5);
            }
            inverseRealFourierTransform(wave, waveLength);
            scaleElementsByFactor(wave, 5.0 / (Math.sqrt(waveLength) * Math.pow(combinedAmplitude, 0.75)));
            wave[waveLength] = wave[0];
            return wave;
        }
    }
    class HarmonicsWave {
        constructor() {
            this.harmonics = [];
            this.hash = -1;
            this.reset();
        }
        reset() {
            for (let i = 0; i < Config.harmonicsControlPoints; i++) {
                this.harmonics[i] = 0;
            }
            this.harmonics[0] = Config.harmonicsMax;
            this.harmonics[3] = Config.harmonicsMax;
            this.harmonics[6] = Config.harmonicsMax;
            this.markCustomWaveDirty();
        }
        markCustomWaveDirty() {
            const hashMult = Synth.fittingPowerOfTwo(Config.harmonicsMax + 2) - 1;
            let hash = 0;
            for (const point of this.harmonics)
                hash = ((hash * hashMult) + point) >>> 0;
            this.hash = hash;
        }
    }
    class HarmonicsWaveState {
        constructor() {
            this.wave = null;
            this._hash = -1;
        }
        getCustomWave(settings, instrumentType) {
            if (this._hash == settings.hash && this._generatedForType == instrumentType)
                return this.wave;
            this._hash = settings.hash;
            this._generatedForType = instrumentType;
            const harmonicsRendered = (instrumentType == 7) ? Config.harmonicsRenderedForPickedString : Config.harmonicsRendered;
            const waveLength = Config.harmonicsWavelength;
            const retroWave = getDrumWave(0, null, null);
            if (this.wave == null || this.wave.length != waveLength + 1) {
                this.wave = new Float32Array(waveLength + 1);
            }
            const wave = this.wave;
            for (let i = 0; i < waveLength; i++) {
                wave[i] = 0;
            }
            const overallSlope = -0.25;
            let combinedControlPointAmplitude = 1;
            for (let harmonicIndex = 0; harmonicIndex < harmonicsRendered; harmonicIndex++) {
                const harmonicFreq = harmonicIndex + 1;
                let controlValue = harmonicIndex < Config.harmonicsControlPoints ? settings.harmonics[harmonicIndex] : settings.harmonics[Config.harmonicsControlPoints - 1];
                if (harmonicIndex >= Config.harmonicsControlPoints) {
                    controlValue *= 1 - (harmonicIndex - Config.harmonicsControlPoints) / (harmonicsRendered - Config.harmonicsControlPoints);
                }
                const normalizedValue = controlValue / Config.harmonicsMax;
                let amplitude = Math.pow(2, controlValue - Config.harmonicsMax + 1) * Math.sqrt(normalizedValue);
                if (harmonicIndex < Config.harmonicsControlPoints) {
                    combinedControlPointAmplitude += amplitude;
                }
                amplitude *= Math.pow(harmonicFreq, overallSlope);
                amplitude *= retroWave[harmonicIndex + 589];
                wave[waveLength - harmonicFreq] = amplitude;
            }
            inverseRealFourierTransform(wave, waveLength);
            const mult = 1 / Math.pow(combinedControlPointAmplitude, 0.7);
            for (let i = 0; i < wave.length; i++)
                wave[i] *= mult;
            performIntegralOld(wave);
            wave[waveLength] = wave[0];
            return wave;
        }
    }
    class FilterControlPoint {
        constructor() {
            this.freq = 0;
            this.gain = Config.filterGainCenter;
            this.type = 2;
        }
        set(freqSetting, gainSetting) {
            this.freq = freqSetting;
            this.gain = gainSetting;
        }
        getHz() {
            return FilterControlPoint.getHzFromSettingValue(this.freq);
        }
        static getHzFromSettingValue(value) {
            return Config.filterFreqReferenceHz * Math.pow(2.0, (value - Config.filterFreqReferenceSetting) * Config.filterFreqStep);
        }
        static getSettingValueFromHz(hz) {
            return Math.log2(hz / Config.filterFreqReferenceHz) / Config.filterFreqStep + Config.filterFreqReferenceSetting;
        }
        static getRoundedSettingValueFromHz(hz) {
            return Math.max(0, Math.min(Config.filterFreqRange - 1, Math.round(FilterControlPoint.getSettingValueFromHz(hz))));
        }
        getLinearGain(peakMult = 1.0) {
            const power = (this.gain - Config.filterGainCenter) * Config.filterGainStep;
            const neutral = (this.type == 2) ? 0.0 : -0.5;
            const interpolatedPower = neutral + (power - neutral) * peakMult;
            return Math.pow(2.0, interpolatedPower);
        }
        static getRoundedSettingValueFromLinearGain(linearGain) {
            return Math.max(0, Math.min(Config.filterGainRange - 1, Math.round(Math.log2(linearGain) / Config.filterGainStep + Config.filterGainCenter)));
        }
        toCoefficients(filter, sampleRate, freqMult = 1.0, peakMult = 1.0) {
            const cornerRadiansPerSample = 2.0 * Math.PI * Math.max(Config.filterFreqMinHz, Math.min(Config.filterFreqMaxHz, freqMult * this.getHz())) / sampleRate;
            const linearGain = this.getLinearGain(peakMult);
            switch (this.type) {
                case 0:
                    filter.lowPass2ndOrderButterworth(cornerRadiansPerSample, linearGain);
                    break;
                case 1:
                    filter.highPass2ndOrderButterworth(cornerRadiansPerSample, linearGain);
                    break;
                case 2:
                    filter.peak2ndOrder(cornerRadiansPerSample, linearGain, 1.0);
                    break;
                default:
                    throw new Error();
            }
        }
        getVolumeCompensationMult() {
            const octave = (this.freq - Config.filterFreqReferenceSetting) * Config.filterFreqStep;
            const gainPow = (this.gain - Config.filterGainCenter) * Config.filterGainStep;
            switch (this.type) {
                case 0:
                    const freqRelativeTo8khz = Math.pow(2.0, octave) * Config.filterFreqReferenceHz / 8000.0;
                    const warpedFreq = (Math.sqrt(1.0 + 4.0 * freqRelativeTo8khz) - 1.0) / 2.0;
                    const warpedOctave = Math.log2(warpedFreq);
                    return Math.pow(0.5, 0.2 * Math.max(0.0, gainPow + 1.0) + Math.min(0.0, Math.max(-3.0, 0.595 * warpedOctave + 0.35 * Math.min(0.0, gainPow + 1.0))));
                case 1:
                    return Math.pow(0.5, 0.125 * Math.max(0.0, gainPow + 1.0) + Math.min(0.0, 0.3 * (-octave - Math.log2(Config.filterFreqReferenceHz / 125.0)) + 0.2 * Math.min(0.0, gainPow + 1.0)));
                case 2:
                    const distanceFromCenter = octave + Math.log2(Config.filterFreqReferenceHz / 2000.0);
                    const freqLoudness = Math.pow(1.0 / (1.0 + Math.pow(distanceFromCenter / 3.0, 2.0)), 2.0);
                    return Math.pow(0.5, 0.125 * Math.max(0.0, gainPow) + 0.1 * freqLoudness * Math.min(0.0, gainPow));
                default:
                    throw new Error();
            }
        }
    }
    class FilterSettings {
        constructor() {
            this.controlPoints = [];
            this.controlPointCount = 0;
            this.reset();
        }
        reset() {
            this.controlPointCount = 0;
        }
        addPoint(type, freqSetting, gainSetting) {
            let controlPoint;
            if (this.controlPoints.length <= this.controlPointCount) {
                controlPoint = new FilterControlPoint();
                this.controlPoints[this.controlPointCount] = controlPoint;
            }
            else {
                controlPoint = this.controlPoints[this.controlPointCount];
            }
            this.controlPointCount++;
            controlPoint.type = type;
            controlPoint.set(freqSetting, gainSetting);
        }
        toJsonObject() {
            const filterArray = [];
            for (let i = 0; i < this.controlPointCount; i++) {
                const point = this.controlPoints[i];
                filterArray.push({
                    "type": Config.filterTypeNames[point.type],
                    "cutoffHz": Math.round(point.getHz() * 100) / 100,
                    "linearGain": Math.round(point.getLinearGain() * 10000) / 10000,
                });
            }
            return filterArray;
        }
        fromJsonObject(filterObject) {
            this.controlPoints.length = 0;
            if (filterObject) {
                for (const pointObject of filterObject) {
                    const point = new FilterControlPoint();
                    point.type = Config.filterTypeNames.indexOf(pointObject["type"]);
                    if (point.type == -1)
                        point.type = 2;
                    if (pointObject["cutoffHz"] != undefined) {
                        point.freq = FilterControlPoint.getRoundedSettingValueFromHz(pointObject["cutoffHz"]);
                    }
                    else {
                        point.freq = 0;
                    }
                    if (pointObject["linearGain"] != undefined) {
                        point.gain = FilterControlPoint.getRoundedSettingValueFromLinearGain(pointObject["linearGain"]);
                    }
                    else {
                        point.gain = Config.filterGainCenter;
                    }
                    this.controlPoints.push(point);
                }
            }
            this.controlPointCount = this.controlPoints.length;
        }
        static filtersCanMorph(filterA, filterB) {
            if (filterA.controlPointCount != filterB.controlPointCount)
                return false;
            for (let i = 0; i < filterA.controlPointCount; i++) {
                if (filterA.controlPoints[i].type != filterB.controlPoints[i].type)
                    return false;
            }
            return true;
        }
        static lerpFilters(filterA, filterB, pos) {
            let lerpedFilter = new FilterSettings();
            if (filterA == null) {
                return filterA;
            }
            if (filterB == null) {
                return filterB;
            }
            pos = Math.max(0, Math.min(1, pos));
            if (this.filtersCanMorph(filterA, filterB)) {
                for (let i = 0; i < filterA.controlPointCount; i++) {
                    lerpedFilter.controlPoints[i] = new FilterControlPoint();
                    lerpedFilter.controlPoints[i].type = filterA.controlPoints[i].type;
                    lerpedFilter.controlPoints[i].freq = filterA.controlPoints[i].freq + (filterB.controlPoints[i].freq - filterA.controlPoints[i].freq) * pos;
                    lerpedFilter.controlPoints[i].gain = filterA.controlPoints[i].gain + (filterB.controlPoints[i].gain - filterA.controlPoints[i].gain) * pos;
                }
                lerpedFilter.controlPointCount = filterA.controlPointCount;
                return lerpedFilter;
            }
            else {
                return (pos >= 1) ? filterB : filterA;
            }
        }
        convertLegacySettings(legacyCutoffSetting, legacyResonanceSetting, legacyEnv) {
            this.reset();
            const legacyFilterCutoffMaxHz = 8000;
            const legacyFilterMax = 0.95;
            const legacyFilterMaxRadians = Math.asin(legacyFilterMax / 2.0) * 2.0;
            const legacyFilterMaxResonance = 0.95;
            const legacyFilterCutoffRange = 11;
            const legacyFilterResonanceRange = 8;
            const resonant = (legacyResonanceSetting > 1);
            const firstOrder = (legacyResonanceSetting == 0);
            const cutoffAtMax = (legacyCutoffSetting == legacyFilterCutoffRange - 1);
            const envDecays = (legacyEnv.type == 3 || legacyEnv.type == 4 || legacyEnv.type == 8 || legacyEnv.type == 0);
            const standardSampleRate = 48000;
            const legacyHz = legacyFilterCutoffMaxHz * Math.pow(2.0, (legacyCutoffSetting - (legacyFilterCutoffRange - 1)) * 0.5);
            const legacyRadians = Math.min(legacyFilterMaxRadians, 2 * Math.PI * legacyHz / standardSampleRate);
            if (legacyEnv.type == 1 && !resonant && cutoffAtMax) ;
            else if (firstOrder) {
                const extraOctaves = 3.5;
                const targetRadians = legacyRadians * Math.pow(2.0, extraOctaves);
                const curvedRadians = targetRadians / (1.0 + targetRadians / Math.PI);
                const curvedHz = standardSampleRate * curvedRadians / (2.0 * Math.PI);
                const freqSetting = FilterControlPoint.getRoundedSettingValueFromHz(curvedHz);
                const finalHz = FilterControlPoint.getHzFromSettingValue(freqSetting);
                const finalRadians = 2.0 * Math.PI * finalHz / standardSampleRate;
                const legacyFilter = new FilterCoefficients();
                legacyFilter.lowPass1stOrderSimplified(legacyRadians);
                const response = new FrequencyResponse();
                response.analyze(legacyFilter, finalRadians);
                const legacyFilterGainAtNewRadians = response.magnitude();
                let logGain = Math.log2(legacyFilterGainAtNewRadians);
                logGain = -extraOctaves + (logGain + extraOctaves) * 0.82;
                if (envDecays)
                    logGain = Math.min(logGain, -1.0);
                const convertedGain = Math.pow(2.0, logGain);
                const gainSetting = FilterControlPoint.getRoundedSettingValueFromLinearGain(convertedGain);
                this.addPoint(0, freqSetting, gainSetting);
            }
            else {
                const intendedGain = 0.5 / (1.0 - legacyFilterMaxResonance * Math.sqrt(Math.max(0.0, legacyResonanceSetting - 1.0) / (legacyFilterResonanceRange - 2.0)));
                const invertedGain = 0.5 / intendedGain;
                const maxRadians = 2.0 * Math.PI * legacyFilterCutoffMaxHz / standardSampleRate;
                const freqRatio = legacyRadians / maxRadians;
                const targetRadians = legacyRadians * (freqRatio * Math.pow(invertedGain, 0.9) + 1.0);
                const curvedRadians = legacyRadians + (targetRadians - legacyRadians) * invertedGain;
                let curvedHz;
                if (envDecays) {
                    curvedHz = standardSampleRate * Math.min(curvedRadians, legacyRadians * Math.pow(2, 0.25)) / (2.0 * Math.PI);
                }
                else {
                    curvedHz = standardSampleRate * curvedRadians / (2.0 * Math.PI);
                }
                const freqSetting = FilterControlPoint.getRoundedSettingValueFromHz(curvedHz);
                let legacyFilterGain;
                if (envDecays) {
                    legacyFilterGain = intendedGain;
                }
                else {
                    const legacyFilter = new FilterCoefficients();
                    legacyFilter.lowPass2ndOrderSimplified(legacyRadians, intendedGain);
                    const response = new FrequencyResponse();
                    response.analyze(legacyFilter, curvedRadians);
                    legacyFilterGain = response.magnitude();
                }
                if (!resonant)
                    legacyFilterGain = Math.min(legacyFilterGain, Math.sqrt(0.5));
                const gainSetting = FilterControlPoint.getRoundedSettingValueFromLinearGain(legacyFilterGain);
                this.addPoint(0, freqSetting, gainSetting);
            }
            this.controlPoints.length = this.controlPointCount;
        }
        convertLegacySettingsForSynth(legacyCutoffSetting, legacyResonanceSetting, allowFirstOrder = false) {
            this.reset();
            const legacyFilterCutoffMaxHz = 8000;
            const legacyFilterMax = 0.95;
            const legacyFilterMaxRadians = Math.asin(legacyFilterMax / 2.0) * 2.0;
            const legacyFilterMaxResonance = 0.95;
            const legacyFilterCutoffRange = 11;
            const legacyFilterResonanceRange = 8;
            const firstOrder = (legacyResonanceSetting == 0 && allowFirstOrder);
            const standardSampleRate = 48000;
            const legacyHz = legacyFilterCutoffMaxHz * Math.pow(2.0, (legacyCutoffSetting - (legacyFilterCutoffRange - 1)) * 0.5);
            const legacyRadians = Math.min(legacyFilterMaxRadians, 2 * Math.PI * legacyHz / standardSampleRate);
            if (firstOrder) {
                const extraOctaves = 3.5;
                const targetRadians = legacyRadians * Math.pow(2.0, extraOctaves);
                const curvedRadians = targetRadians / (1.0 + targetRadians / Math.PI);
                const curvedHz = standardSampleRate * curvedRadians / (2.0 * Math.PI);
                const freqSetting = FilterControlPoint.getRoundedSettingValueFromHz(curvedHz);
                const finalHz = FilterControlPoint.getHzFromSettingValue(freqSetting);
                const finalRadians = 2.0 * Math.PI * finalHz / standardSampleRate;
                const legacyFilter = new FilterCoefficients();
                legacyFilter.lowPass1stOrderSimplified(legacyRadians);
                const response = new FrequencyResponse();
                response.analyze(legacyFilter, finalRadians);
                const legacyFilterGainAtNewRadians = response.magnitude();
                let logGain = Math.log2(legacyFilterGainAtNewRadians);
                logGain = -extraOctaves + (logGain + extraOctaves) * 0.82;
                const convertedGain = Math.pow(2.0, logGain);
                const gainSetting = FilterControlPoint.getRoundedSettingValueFromLinearGain(convertedGain);
                this.addPoint(0, freqSetting, gainSetting);
            }
            else {
                const intendedGain = 0.5 / (1.0 - legacyFilterMaxResonance * Math.sqrt(Math.max(0.0, legacyResonanceSetting - 1.0) / (legacyFilterResonanceRange - 2.0)));
                const invertedGain = 0.5 / intendedGain;
                const maxRadians = 2.0 * Math.PI * legacyFilterCutoffMaxHz / standardSampleRate;
                const freqRatio = legacyRadians / maxRadians;
                const targetRadians = legacyRadians * (freqRatio * Math.pow(invertedGain, 0.9) + 1.0);
                const curvedRadians = legacyRadians + (targetRadians - legacyRadians) * invertedGain;
                let curvedHz;
                curvedHz = standardSampleRate * curvedRadians / (2.0 * Math.PI);
                const freqSetting = FilterControlPoint.getSettingValueFromHz(curvedHz);
                let legacyFilterGain;
                const legacyFilter = new FilterCoefficients();
                legacyFilter.lowPass2ndOrderSimplified(legacyRadians, intendedGain);
                const response = new FrequencyResponse();
                response.analyze(legacyFilter, curvedRadians);
                legacyFilterGain = response.magnitude();
                const gainSetting = FilterControlPoint.getRoundedSettingValueFromLinearGain(legacyFilterGain);
                this.addPoint(0, freqSetting, gainSetting);
            }
        }
    }
    class EnvelopeSettings {
        constructor() {
            this.target = 0;
            this.index = 0;
            this.envelope = 0;
            this.reset();
        }
        reset() {
            this.target = 0;
            this.index = 0;
            this.envelope = 0;
        }
        toJsonObject() {
            const envelopeObject = {
                "target": Config.instrumentAutomationTargets[this.target].name,
                "envelope": Config.envelopes[this.envelope].name,
            };
            if (Config.instrumentAutomationTargets[this.target].maxCount > 1) {
                envelopeObject["index"] = this.index;
            }
            return envelopeObject;
        }
        fromJsonObject(envelopeObject) {
            this.reset();
            let target = Config.instrumentAutomationTargets.dictionary[envelopeObject["target"]];
            if (target == null)
                target = Config.instrumentAutomationTargets.dictionary["noteVolume"];
            this.target = target.index;
            let envelope = Config.envelopes.dictionary[envelopeObject["envelope"]];
            if (envelope == null)
                envelope = Config.envelopes.dictionary["none"];
            this.envelope = envelope.index;
            if (envelopeObject["index"] != undefined) {
                this.index = clamp(0, Config.instrumentAutomationTargets[this.target].maxCount, envelopeObject["index"] | 0);
            }
            else {
                this.index = 0;
            }
        }
    }
    class Instrument {
        constructor(isNoiseChannel, isModChannel) {
            this.type = 0;
            this.preset = 0;
            this.chipWave = 2;
            this.chipNoise = 1;
            this.eqFilter = new FilterSettings();
            this.eqFilterType = false;
            this.eqFilterSimpleCut = Config.filterSimpleCutRange - 1;
            this.eqFilterSimplePeak = 0;
            this.noteFilter = new FilterSettings();
            this.noteFilterType = false;
            this.noteFilterSimpleCut = Config.filterSimpleCutRange - 1;
            this.noteFilterSimplePeak = 0;
            this.eqSubFilters = [];
            this.noteSubFilters = [];
            this.envelopes = [];
            this.fadeIn = 0;
            this.fadeOut = Config.fadeOutNeutral;
            this.envelopeCount = 0;
            this.transition = Config.transitions.dictionary["normal"].index;
            this.pitchShift = 0;
            this.detune = 0;
            this.vibrato = 0;
            this.interval = 0;
            this.vibratoDepth = 0;
            this.vibratoSpeed = 10;
            this.vibratoDelay = 0;
            this.vibratoType = 0;
            this.unison = 0;
            this.effects = 0;
            this.chord = 1;
            this.volume = 0;
            this.pan = Config.panCenter;
            this.panDelay = 10;
            this.arpeggioSpeed = 12;
            this.fastTwoNoteArp = false;
            this.legacyTieOver = false;
            this.clicklessTransition = false;
            this.aliases = false;
            this.pulseWidth = Config.pulseWidthRange;
            this.stringSustain = 10;
            this.distortion = 0;
            this.bitcrusherFreq = 0;
            this.bitcrusherQuantization = 0;
            this.chorus = 0;
            this.reverb = 0;
            this.echoSustain = 0;
            this.echoDelay = 0;
            this.algorithm = 0;
            this.feedbackType = 0;
            this.feedbackAmplitude = 0;
            this.LFOtime = 0;
            this.nextLFOtime = 0;
            this.arpTime = 0;
            this.customChipWave = new Float32Array(64);
            this.customChipWaveIntegral = new Float32Array(65);
            this.operators = [];
            this.harmonicsWave = new HarmonicsWave();
            this.drumsetEnvelopes = [];
            this.drumsetSpectrumWaves = [];
            this.modChannels = [];
            this.modInstruments = [];
            this.modulators = [];
            this.modFilterTypes = [];
            this.invalidModulators = [];
            this.invertWave = false;
            if (isModChannel) {
                for (let mod = 0; mod < Config.modCount; mod++) {
                    this.modChannels.push(0);
                    this.modInstruments.push(0);
                    this.modulators.push(Config.modulators.dictionary["none"].index);
                }
            }
            this.spectrumWave = new SpectrumWave(isNoiseChannel);
            for (let i = 0; i < Config.operatorCount; i++) {
                this.operators[i] = new Operator(i);
            }
            for (let i = 0; i < Config.drumCount; i++) {
                this.drumsetEnvelopes[i] = Config.envelopes.dictionary["twang 2"].index;
                this.drumsetSpectrumWaves[i] = new SpectrumWave(true);
            }
            for (let i = 0; i < 64; i++) {
                this.customChipWave[i] = 24 - Math.floor(i * (48 / 64));
            }
            let sum = 0.0;
            for (let i = 0; i < this.customChipWave.length; i++) {
                sum += this.customChipWave[i];
            }
            const average = sum / this.customChipWave.length;
            let cumulative = 0;
            let wavePrev = 0;
            for (let i = 0; i < this.customChipWave.length; i++) {
                cumulative += wavePrev;
                wavePrev = this.customChipWave[i] - average;
                this.customChipWaveIntegral[i] = cumulative;
            }
            this.customChipWaveIntegral[64] = 0.0;
        }
        setTypeAndReset(type, isNoiseChannel, isModChannel) {
            if (isModChannel)
                type = 9;
            this.type = type;
            this.preset = type;
            this.volume = 0;
            this.effects = (1 << 2);
            this.chorus = Config.chorusRange - 1;
            this.reverb = 0;
            this.echoSustain = Math.floor((Config.echoSustainRange - 1) * 0.5);
            this.echoDelay = Math.floor((Config.echoDelayRange - 1) * 0.5);
            this.eqFilter.reset();
            this.eqFilterType = false;
            this.eqFilterSimpleCut = Config.filterSimpleCutRange - 1;
            this.eqFilterSimplePeak = 0;
            for (let i = 0; i < Config.filterMorphCount; i++) {
                this.eqSubFilters[i] = null;
                this.noteSubFilters[i] = null;
            }
            this.noteFilter.reset();
            this.noteFilterType = false;
            this.noteFilterSimpleCut = Config.filterSimpleCutRange - 1;
            this.noteFilterSimplePeak = 0;
            this.distortion = Math.floor((Config.distortionRange - 1) * 0.75);
            this.bitcrusherFreq = Math.floor((Config.bitcrusherFreqRange - 1) * 0.5);
            this.bitcrusherQuantization = Math.floor((Config.bitcrusherQuantizationRange - 1) * 0.5);
            this.pan = Config.panCenter;
            this.panDelay = 10;
            this.pitchShift = Config.pitchShiftCenter;
            this.detune = Config.detuneCenter;
            this.vibrato = 0;
            this.unison = 0;
            this.stringSustain = 10;
            this.clicklessTransition = false;
            this.arpeggioSpeed = 12;
            this.legacyTieOver = false;
            this.aliases = false;
            this.fadeIn = 0;
            this.fadeOut = Config.fadeOutNeutral;
            this.transition = Config.transitions.dictionary["normal"].index;
            this.envelopeCount = 0;
            this.invertWave = false;
            switch (type) {
                case 0:
                    this.chipWave = 2;
                    this.chord = Config.chords.dictionary["arpeggio"].index;
                    break;
                case 8:
                    this.chipWave = 2;
                    this.chord = Config.chords.dictionary["arpeggio"].index;
                    for (let i = 0; i < 64; i++) {
                        this.customChipWave[i] = 24 - (Math.floor(i * (48 / 64)));
                    }
                    let sum = 0.0;
                    for (let i = 0; i < this.customChipWave.length; i++) {
                        sum += this.customChipWave[i];
                    }
                    const average = sum / this.customChipWave.length;
                    let cumulative = 0;
                    let wavePrev = 0;
                    for (let i = 0; i < this.customChipWave.length; i++) {
                        cumulative += wavePrev;
                        wavePrev = this.customChipWave[i] - average;
                        this.customChipWaveIntegral[i] = cumulative;
                    }
                    this.customChipWaveIntegral[64] = 0.0;
                    break;
                case 1:
                    this.chord = Config.chords.dictionary["custom interval"].index;
                    this.algorithm = 0;
                    this.feedbackType = 0;
                    this.feedbackAmplitude = 0;
                    for (let i = 0; i < this.operators.length; i++) {
                        this.operators[i].reset(i);
                    }
                    break;
                case 2:
                    this.chipNoise = 1;
                    this.chord = Config.chords.dictionary["arpeggio"].index;
                    break;
                case 3:
                    this.chord = Config.chords.dictionary["simultaneous"].index;
                    this.spectrumWave.reset(isNoiseChannel);
                    break;
                case 4:
                    this.chord = Config.chords.dictionary["simultaneous"].index;
                    for (let i = 0; i < Config.drumCount; i++) {
                        this.drumsetEnvelopes[i] = Config.envelopes.dictionary["twang 2"].index;
                        if (this.drumsetSpectrumWaves[i] == undefined) {
                            this.drumsetSpectrumWaves[i] = new SpectrumWave(true);
                        }
                        this.drumsetSpectrumWaves[i].reset(isNoiseChannel);
                    }
                    break;
                case 5:
                    this.chord = Config.chords.dictionary["simultaneous"].index;
                    this.harmonicsWave.reset();
                    break;
                case 6:
                    this.chord = Config.chords.dictionary["arpeggio"].index;
                    this.pulseWidth = Config.pulseWidthRange;
                    break;
                case 7:
                    this.chord = Config.chords.dictionary["strum"].index;
                    this.harmonicsWave.reset();
                    break;
                case 9:
                    this.transition = 0;
                    this.vibrato = 0;
                    this.interval = 0;
                    this.effects = 0;
                    this.chord = 0;
                    this.modChannels = [];
                    this.modInstruments = [];
                    this.modulators = [];
                    for (let mod = 0; mod < Config.modCount; mod++) {
                        this.modChannels.push(-2);
                        this.modInstruments.push(0);
                        this.modulators.push(Config.modulators.dictionary["none"].index);
                        this.invalidModulators[mod] = false;
                        this.modFilterTypes[mod] = 0;
                    }
                    break;
                default:
                    throw new Error("Unrecognized instrument type: " + type);
            }
            if (this.chord != Config.chords.dictionary["simultaneous"].index) {
                this.effects = (this.effects | (1 << 11));
            }
        }
        convertLegacySettings(legacySettings, forceSimpleFilter) {
            let legacyCutoffSetting = legacySettings.filterCutoff;
            let legacyResonanceSetting = legacySettings.filterResonance;
            let legacyFilterEnv = legacySettings.filterEnvelope;
            let legacyPulseEnv = legacySettings.pulseEnvelope;
            let legacyOperatorEnvelopes = legacySettings.operatorEnvelopes;
            let legacyFeedbackEnv = legacySettings.feedbackEnvelope;
            if (legacyCutoffSetting == undefined)
                legacyCutoffSetting = (this.type == 0) ? 6 : 10;
            if (legacyResonanceSetting == undefined)
                legacyResonanceSetting = 0;
            if (legacyFilterEnv == undefined)
                legacyFilterEnv = Config.envelopes.dictionary["none"];
            if (legacyPulseEnv == undefined)
                legacyPulseEnv = Config.envelopes.dictionary[(this.type == 6) ? "twang 2" : "none"];
            if (legacyOperatorEnvelopes == undefined)
                legacyOperatorEnvelopes = [Config.envelopes.dictionary[(this.type == 1) ? "note size" : "none"], Config.envelopes.dictionary["none"], Config.envelopes.dictionary["none"], Config.envelopes.dictionary["none"]];
            if (legacyFeedbackEnv == undefined)
                legacyFeedbackEnv = Config.envelopes.dictionary["none"];
            const legacyFilterCutoffRange = 11;
            const cutoffAtMax = (legacyCutoffSetting == legacyFilterCutoffRange - 1);
            if (cutoffAtMax && legacyFilterEnv.type == 2)
                legacyFilterEnv = Config.envelopes.dictionary["none"];
            const carrierCount = Config.algorithms[this.algorithm].carrierCount;
            let noCarriersControlledByNoteSize = true;
            let allCarriersControlledByNoteSize = true;
            let noteSizeControlsSomethingElse = (legacyFilterEnv.type == 0) || (legacyPulseEnv.type == 0);
            if (this.type == 1) {
                noteSizeControlsSomethingElse = noteSizeControlsSomethingElse || (legacyFeedbackEnv.type == 0);
                for (let i = 0; i < legacyOperatorEnvelopes.length; i++) {
                    if (i < carrierCount) {
                        if (legacyOperatorEnvelopes[i].type != 0) {
                            allCarriersControlledByNoteSize = false;
                        }
                        else {
                            noCarriersControlledByNoteSize = false;
                        }
                    }
                    else {
                        noteSizeControlsSomethingElse = noteSizeControlsSomethingElse || (legacyOperatorEnvelopes[i].type == 0);
                    }
                }
            }
            this.envelopeCount = 0;
            if (this.type == 1) {
                if (allCarriersControlledByNoteSize && noteSizeControlsSomethingElse) {
                    this.addEnvelope(Config.instrumentAutomationTargets.dictionary["noteVolume"].index, 0, Config.envelopes.dictionary["note size"].index);
                }
                else if (noCarriersControlledByNoteSize && !noteSizeControlsSomethingElse) {
                    this.addEnvelope(Config.instrumentAutomationTargets.dictionary["none"].index, 0, Config.envelopes.dictionary["note size"].index);
                }
            }
            if (legacyFilterEnv.type == 1) {
                this.noteFilter.reset();
                this.noteFilterType = false;
                this.eqFilter.convertLegacySettings(legacyCutoffSetting, legacyResonanceSetting, legacyFilterEnv);
                this.effects &= ~(1 << 5);
                if (forceSimpleFilter || this.eqFilterType) {
                    this.eqFilterType = true;
                    this.eqFilterSimpleCut = legacyCutoffSetting;
                    this.eqFilterSimplePeak = legacyResonanceSetting;
                }
            }
            else {
                this.eqFilter.reset();
                this.eqFilterType = false;
                this.noteFilterType = false;
                this.noteFilter.convertLegacySettings(legacyCutoffSetting, legacyResonanceSetting, legacyFilterEnv);
                this.effects |= 1 << 5;
                this.addEnvelope(Config.instrumentAutomationTargets.dictionary["noteFilterAllFreqs"].index, 0, legacyFilterEnv.index);
                if (forceSimpleFilter || this.noteFilterType) {
                    this.noteFilterType = true;
                    this.noteFilterSimpleCut = legacyCutoffSetting;
                    this.noteFilterSimplePeak = legacyResonanceSetting;
                }
            }
            if (legacyPulseEnv.type != 1) {
                this.addEnvelope(Config.instrumentAutomationTargets.dictionary["pulseWidth"].index, 0, legacyPulseEnv.index);
            }
            for (let i = 0; i < legacyOperatorEnvelopes.length; i++) {
                if (i < carrierCount && allCarriersControlledByNoteSize)
                    continue;
                if (legacyOperatorEnvelopes[i].type != 1) {
                    this.addEnvelope(Config.instrumentAutomationTargets.dictionary["operatorAmplitude"].index, i, legacyOperatorEnvelopes[i].index);
                }
            }
            if (legacyFeedbackEnv.type != 1) {
                this.addEnvelope(Config.instrumentAutomationTargets.dictionary["feedbackAmplitude"].index, 0, legacyFeedbackEnv.index);
            }
        }
        toJsonObject() {
            const instrumentObject = {
                "type": Config.instrumentTypeNames[this.type],
                "volume": this.volume,
                "eqFilter": this.eqFilter.toJsonObject(),
                "eqFilterType": this.eqFilterType,
                "eqSimpleCut": this.eqFilterSimpleCut,
                "eqSimplePeak": this.eqFilterSimplePeak
            };
            if (this.preset != this.type) {
                instrumentObject["preset"] = this.preset;
            }
            for (let i = 0; i < Config.filterMorphCount; i++) {
                if (this.eqSubFilters[i] != null)
                    instrumentObject["eqSubFilters" + i] = this.eqSubFilters[i].toJsonObject();
            }
            const effects = [];
            for (const effect of Config.effectOrder) {
                if (this.effects & (1 << effect)) {
                    effects.push(Config.effectNames[effect]);
                }
            }
            instrumentObject["effects"] = effects;
            if (effectsIncludeTransition(this.effects)) {
                instrumentObject["transition"] = Config.transitions[this.transition].name;
                instrumentObject["clicklessTransition"] = this.clicklessTransition;
            }
            if (effectsIncludeChord(this.effects)) {
                instrumentObject["chord"] = this.getChord().name;
                instrumentObject["fastTwoNoteArp"] = this.fastTwoNoteArp;
                instrumentObject["arpeggioSpeed"] = this.arpeggioSpeed;
            }
            if (effectsIncludePitchShift(this.effects)) {
                instrumentObject["pitchShiftSemitones"] = this.pitchShift;
            }
            if (effectsIncludeDetune(this.effects)) {
                instrumentObject["detuneCents"] = Synth.detuneToCents(this.detune);
            }
            if (effectsIncludeVibrato(this.effects)) {
                if (this.vibrato == -1) {
                    this.vibrato = 5;
                }
                if (this.vibrato != 5) {
                    instrumentObject["vibrato"] = Config.vibratos[this.vibrato].name;
                }
                else {
                    instrumentObject["vibrato"] = "custom";
                }
                instrumentObject["vibratoDepth"] = this.vibratoDepth;
                instrumentObject["vibratoDelay"] = this.vibratoDelay;
                instrumentObject["vibratoSpeed"] = this.vibratoSpeed;
                instrumentObject["vibratoType"] = this.vibratoType;
            }
            if (effectsIncludeNoteFilter(this.effects)) {
                instrumentObject["noteFilterType"] = this.noteFilterType;
                instrumentObject["noteSimpleCut"] = this.noteFilterSimpleCut;
                instrumentObject["noteSimplePeak"] = this.noteFilterSimplePeak;
                instrumentObject["noteFilter"] = this.noteFilter.toJsonObject();
                for (let i = 0; i < Config.filterMorphCount; i++) {
                    if (this.noteSubFilters[i] != null)
                        instrumentObject["noteSubFilters" + i] = this.noteSubFilters[i].toJsonObject();
                }
            }
            if (effectsIncludeDistortion(this.effects)) {
                instrumentObject["distortion"] = Math.round(100 * this.distortion / (Config.distortionRange - 1));
                instrumentObject["aliases"] = this.aliases;
            }
            if (effectsIncludeBitcrusher(this.effects)) {
                instrumentObject["bitcrusherOctave"] = (Config.bitcrusherFreqRange - 1 - this.bitcrusherFreq) * Config.bitcrusherOctaveStep;
                instrumentObject["bitcrusherQuantization"] = Math.round(100 * this.bitcrusherQuantization / (Config.bitcrusherQuantizationRange - 1));
            }
            if (effectsIncludePanning(this.effects)) {
                instrumentObject["pan"] = Math.round(100 * (this.pan - Config.panCenter) / Config.panCenter);
                instrumentObject["panDelay"] = this.panDelay;
            }
            if (effectsIncludeChorus(this.effects)) {
                instrumentObject["chorus"] = Math.round(100 * this.chorus / (Config.chorusRange - 1));
            }
            if (effectsIncludeEcho(this.effects)) {
                instrumentObject["echoSustain"] = Math.round(100 * this.echoSustain / (Config.echoSustainRange - 1));
                instrumentObject["echoDelayBeats"] = Math.round(1000 * (this.echoDelay + 1) * Config.echoDelayStepTicks / (Config.ticksPerPart * Config.partsPerBeat)) / 1000;
            }
            if (effectsIncludeReverb(this.effects)) {
                instrumentObject["reverb"] = Math.round(100 * this.reverb / (Config.reverbRange - 1));
            }
            if (this.type != 4) {
                instrumentObject["fadeInSeconds"] = Math.round(10000 * Synth.fadeInSettingToSeconds(this.fadeIn)) / 10000;
                instrumentObject["fadeOutTicks"] = Synth.fadeOutSettingToTicks(this.fadeOut);
            }
            if (this.type == 5 || this.type == 7) {
                instrumentObject["harmonics"] = [];
                for (let i = 0; i < Config.harmonicsControlPoints; i++) {
                    instrumentObject["harmonics"][i] = Math.round(100 * this.harmonicsWave.harmonics[i] / Config.harmonicsMax);
                }
            }
            if (this.type == 2) {
                instrumentObject["wave"] = Config.chipNoises[this.chipNoise].name;
            }
            else if (this.type == 3) {
                instrumentObject["spectrum"] = [];
                for (let i = 0; i < Config.spectrumControlPoints; i++) {
                    instrumentObject["spectrum"][i] = Math.round(100 * this.spectrumWave.spectrum[i] / Config.spectrumMax);
                }
            }
            else if (this.type == 4) {
                instrumentObject["drums"] = [];
                for (let j = 0; j < Config.drumCount; j++) {
                    const spectrum = [];
                    for (let i = 0; i < Config.spectrumControlPoints; i++) {
                        spectrum[i] = Math.round(100 * this.drumsetSpectrumWaves[j].spectrum[i] / Config.spectrumMax);
                    }
                    instrumentObject["drums"][j] = {
                        "filterEnvelope": this.getDrumsetEnvelope(j).name,
                        "spectrum": spectrum,
                    };
                }
            }
            else if (this.type == 0) {
                instrumentObject["wave"] = Config.chipWaves[this.chipWave].name;
                instrumentObject["unison"] = Config.unisons[this.unison].name;
            }
            else if (this.type == 6) {
                instrumentObject["pulseWidth"] = this.pulseWidth;
            }
            else if (this.type == 7) {
                instrumentObject["unison"] = Config.unisons[this.unison].name;
                instrumentObject["stringSustain"] = Math.round(100 * this.stringSustain / (Config.stringSustainRange - 1));
            }
            else if (this.type == 5) {
                instrumentObject["unison"] = Config.unisons[this.unison].name;
            }
            else if (this.type == 1) {
                const operatorArray = [];
                for (const operator of this.operators) {
                    operatorArray.push({
                        "frequency": Config.operatorFrequencies[operator.frequency].name,
                        "amplitude": operator.amplitude,
                        "waveform": Config.operatorWaves[operator.waveform].name,
                        "pulseWidth": operator.pulseWidth,
                    });
                }
                instrumentObject["algorithm"] = Config.algorithms[this.algorithm].name;
                instrumentObject["feedbackType"] = Config.feedbacks[this.feedbackType].name;
                instrumentObject["feedbackAmplitude"] = this.feedbackAmplitude;
                instrumentObject["operators"] = operatorArray;
            }
            else if (this.type == 8) {
                instrumentObject["wave"] = Config.chipWaves[this.chipWave].name;
                instrumentObject["unison"] = Config.unisons[this.unison].name;
                instrumentObject["customChipWave"] = new Float64Array(64);
                instrumentObject["customChipWaveIntegral"] = new Float64Array(65);
                for (let i = 0; i < this.customChipWave.length; i++) {
                    instrumentObject["customChipWave"][i] = this.customChipWave[i];
                }
            }
            else if (this.type == 9) {
                instrumentObject["modChannels"] = [];
                instrumentObject["modInstruments"] = [];
                instrumentObject["modSettings"] = [];
                instrumentObject["modStatuses"] = [];
                for (let mod = 0; mod < Config.modCount; mod++) {
                    instrumentObject["modChannels"][mod] = this.modChannels[mod];
                    instrumentObject["modInstruments"][mod] = this.modInstruments[mod];
                    instrumentObject["modSettings"][mod] = this.modulators[mod];
                }
            }
            else {
                throw new Error("Unrecognized instrument type");
            }
            const envelopes = [];
            for (let i = 0; i < this.envelopeCount; i++) {
                envelopes.push(this.envelopes[i].toJsonObject());
            }
            instrumentObject["envelopes"] = envelopes;
            instrumentObject["invertWave"] = this.invertWave;
            return instrumentObject;
        }
        fromJsonObject(instrumentObject, isNoiseChannel, isModChannel, useSlowerRhythm, useFastTwoNoteArp, legacyGlobalReverb = 0) {
            if (instrumentObject == undefined)
                instrumentObject = {};
            let type = Config.instrumentTypeNames.indexOf(instrumentObject["type"]);
            if (type == -1)
                type = isModChannel ? 9 : (isNoiseChannel ? 2 : 0);
            this.setTypeAndReset(type, isNoiseChannel, isModChannel);
            if (instrumentObject["preset"] != undefined) {
                this.preset = instrumentObject["preset"] >>> 0;
            }
            if (instrumentObject["volume"] != undefined) {
                this.volume = clamp(-Config.volumeRange / 2, (Config.volumeRange / 2) + 1, instrumentObject["volume"] | 0);
            }
            else {
                this.volume = 0;
            }
            if (Array.isArray(instrumentObject["effects"])) {
                let effects = 0;
                for (let i = 0; i < instrumentObject["effects"].length; i++) {
                    effects = effects | (1 << Config.effectNames.indexOf(instrumentObject["effects"][i]));
                }
                this.effects = (effects & ((1 << 12) - 1));
            }
            else {
                const legacyEffectsNames = ["none", "reverb", "chorus", "chorus & reverb"];
                this.effects = legacyEffectsNames.indexOf(instrumentObject["effects"]);
                if (this.effects == -1)
                    this.effects = (this.type == 2) ? 0 : 1;
            }
            this.transition = Config.transitions.dictionary["normal"].index;
            const transitionProperty = instrumentObject["transition"] || instrumentObject["envelope"];
            if (transitionProperty != undefined) {
                let transition = Config.transitions.dictionary[transitionProperty];
                if (instrumentObject["fadeInSeconds"] == undefined || instrumentObject["fadeOutTicks"] == undefined) {
                    const legacySettings = {
                        "binary": { transition: "interrupt", fadeInSeconds: 0.0, fadeOutTicks: -1 },
                        "seamless": { transition: "interrupt", fadeInSeconds: 0.0, fadeOutTicks: -1 },
                        "sudden": { transition: "normal", fadeInSeconds: 0.0, fadeOutTicks: -3 },
                        "hard": { transition: "normal", fadeInSeconds: 0.0, fadeOutTicks: -3 },
                        "smooth": { transition: "normal", fadeInSeconds: 0.025, fadeOutTicks: -3 },
                        "soft": { transition: "normal", fadeInSeconds: 0.025, fadeOutTicks: -3 },
                        "slide": { transition: "slide in pattern", fadeInSeconds: 0.025, fadeOutTicks: -3 },
                        "cross fade": { transition: "normal", fadeInSeconds: 0.04, fadeOutTicks: 6 },
                        "hard fade": { transition: "normal", fadeInSeconds: 0.0, fadeOutTicks: 48 },
                        "medium fade": { transition: "normal", fadeInSeconds: 0.0125, fadeOutTicks: 72 },
                        "soft fade": { transition: "normal", fadeInSeconds: 0.06, fadeOutTicks: 96 },
                    }[transitionProperty];
                    if (legacySettings != undefined) {
                        transition = Config.transitions.dictionary[legacySettings.transition];
                        this.fadeIn = Synth.secondsToFadeInSetting(legacySettings.fadeInSeconds);
                        this.fadeOut = Synth.ticksToFadeOutSetting(legacySettings.fadeOutTicks);
                    }
                }
                if (transition != undefined)
                    this.transition = transition.index;
                if (this.transition != Config.transitions.dictionary["normal"].index) {
                    this.effects = (this.effects | (1 << 10));
                }
            }
            if (instrumentObject["fadeInSeconds"] != undefined) {
                this.fadeIn = Synth.secondsToFadeInSetting(+instrumentObject["fadeInSeconds"]);
            }
            if (instrumentObject["fadeOutTicks"] != undefined) {
                this.fadeOut = Synth.ticksToFadeOutSetting(+instrumentObject["fadeOutTicks"]);
            }
            {
                const chordProperty = instrumentObject["chord"];
                const legacyChordNames = { "harmony": "simultaneous" };
                const chord = Config.chords.dictionary[legacyChordNames[chordProperty]] || Config.chords.dictionary[chordProperty];
                if (chord != undefined) {
                    this.chord = chord.index;
                }
                else {
                    if (this.type == 2) {
                        this.chord = Config.chords.dictionary["arpeggio"].index;
                    }
                    else if (this.type == 7) {
                        this.chord = Config.chords.dictionary["strum"].index;
                    }
                    else if (this.type == 0) {
                        this.chord = Config.chords.dictionary["arpeggio"].index;
                    }
                    else if (this.type == 1) {
                        this.chord = Config.chords.dictionary["custom interval"].index;
                    }
                    else {
                        this.chord = Config.chords.dictionary["simultaneous"].index;
                    }
                }
            }
            this.unison = Config.unisons.dictionary["none"].index;
            const unisonProperty = instrumentObject["unison"] || instrumentObject["interval"] || instrumentObject["chorus"];
            if (unisonProperty != undefined) {
                const legacyChorusNames = { "union": "none", "fifths": "fifth", "octaves": "octave" };
                const unison = Config.unisons.dictionary[legacyChorusNames[unisonProperty]] || Config.unisons.dictionary[unisonProperty];
                if (unison != undefined)
                    this.unison = unison.index;
            }
            if (instrumentObject["chorus"] == "custom harmony") {
                this.unison = Config.unisons.dictionary["hum"].index;
                this.chord = Config.chords.dictionary["custom interval"].index;
            }
            if (this.chord != Config.chords.dictionary["simultaneous"].index && !Array.isArray(instrumentObject["effects"])) {
                this.effects = (this.effects | (1 << 11));
            }
            if (instrumentObject["pitchShiftSemitones"] != undefined) {
                this.pitchShift = clamp(0, Config.pitchShiftRange, Math.round(+instrumentObject["pitchShiftSemitones"]));
            }
            if (instrumentObject["detuneCents"] != undefined) {
                this.detune = clamp(Config.detuneMin, Config.detuneMax + 1, Math.round(Synth.centsToDetune(+instrumentObject["detuneCents"])));
            }
            this.vibrato = Config.vibratos.dictionary["none"].index;
            const vibratoProperty = instrumentObject["vibrato"] || instrumentObject["effect"];
            if (vibratoProperty != undefined) {
                const legacyVibratoNames = { "vibrato light": "light", "vibrato delayed": "delayed", "vibrato heavy": "heavy" };
                const vibrato = Config.vibratos.dictionary[legacyVibratoNames[unisonProperty]] || Config.vibratos.dictionary[vibratoProperty];
                if (vibrato != undefined)
                    this.vibrato = vibrato.index;
                else if (vibratoProperty == "custom")
                    this.vibrato = Config.vibratos.length;
                if (this.vibrato == Config.vibratos.length) {
                    this.vibratoDepth = instrumentObject["vibratoDepth"];
                    this.vibratoSpeed = instrumentObject["vibratoSpeed"];
                    this.vibratoDelay = instrumentObject["vibratoDelay"];
                    this.vibratoType = instrumentObject["vibratoType"];
                }
                else {
                    this.vibratoDepth = Config.vibratos[this.vibrato].amplitude;
                    this.vibratoDelay = Config.vibratos[this.vibrato].delayTicks / 2;
                    this.vibratoSpeed = 10;
                    this.vibratoType = Config.vibratos[this.vibrato].type;
                }
                if (vibrato != Config.vibratos.dictionary["none"]) {
                    this.effects = (this.effects | (1 << 9));
                }
            }
            if (instrumentObject["pan"] != undefined) {
                this.pan = clamp(0, Config.panMax + 1, Math.round(Config.panCenter + (instrumentObject["pan"] | 0) * Config.panCenter / 100));
                if (this.pan != Config.panCenter) {
                    this.effects = (this.effects | (1 << 2));
                }
            }
            else {
                this.pan = Config.panCenter;
                this.effects = (this.effects | (1 << 2));
            }
            if (instrumentObject["panDelay"] != undefined) {
                this.panDelay = (instrumentObject["panDelay"] | 0);
            }
            else {
                this.panDelay = 10;
            }
            if (instrumentObject["detune"] != undefined) {
                this.detune = clamp(Config.detuneMin, Config.detuneMax + 1, (instrumentObject["detune"] | 0));
            }
            else if (instrumentObject["detuneCents"] == undefined) {
                this.detune = Config.detuneCenter;
            }
            if (instrumentObject["distortion"] != undefined) {
                this.distortion = clamp(0, Config.distortionRange, Math.round((Config.distortionRange - 1) * (instrumentObject["distortion"] | 0) / 100));
            }
            if (instrumentObject["bitcrusherOctave"] != undefined) {
                this.bitcrusherFreq = Config.bitcrusherFreqRange - 1 - (+instrumentObject["bitcrusherOctave"]) / Config.bitcrusherOctaveStep;
            }
            if (instrumentObject["bitcrusherQuantization"] != undefined) {
                this.bitcrusherQuantization = clamp(0, Config.bitcrusherQuantizationRange, Math.round((Config.bitcrusherQuantizationRange - 1) * (instrumentObject["bitcrusherQuantization"] | 0) / 100));
            }
            if (instrumentObject["echoSustain"] != undefined) {
                this.echoSustain = clamp(0, Config.echoSustainRange, Math.round((Config.echoSustainRange - 1) * (instrumentObject["echoSustain"] | 0) / 100));
            }
            if (instrumentObject["echoDelayBeats"] != undefined) {
                this.echoDelay = clamp(0, Config.echoDelayRange, Math.round((+instrumentObject["echoDelayBeats"]) * (Config.ticksPerPart * Config.partsPerBeat) / Config.echoDelayStepTicks - 1.0));
            }
            if (!isNaN(instrumentObject["chorus"])) {
                this.chorus = clamp(0, Config.chorusRange, Math.round((Config.chorusRange - 1) * (instrumentObject["chorus"] | 0) / 100));
            }
            if (instrumentObject["reverb"] != undefined) {
                this.reverb = clamp(0, Config.reverbRange, Math.round((Config.reverbRange - 1) * (instrumentObject["reverb"] | 0) / 100));
            }
            else {
                this.reverb = legacyGlobalReverb;
            }
            if (instrumentObject["pulseWidth"] != undefined) {
                this.pulseWidth = clamp(1, Config.pulseWidthRange + 1, Math.round(instrumentObject["pulseWidth"]));
            }
            else {
                this.pulseWidth = Config.pulseWidthRange;
            }
            if (instrumentObject["harmonics"] != undefined) {
                for (let i = 0; i < Config.harmonicsControlPoints; i++) {
                    this.harmonicsWave.harmonics[i] = Math.max(0, Math.min(Config.harmonicsMax, Math.round(Config.harmonicsMax * (+instrumentObject["harmonics"][i]) / 100)));
                }
                this.harmonicsWave.markCustomWaveDirty();
            }
            else {
                this.harmonicsWave.reset();
            }
            if (instrumentObject["spectrum"] != undefined) {
                for (let i = 0; i < Config.spectrumControlPoints; i++) {
                    this.spectrumWave.spectrum[i] = Math.max(0, Math.min(Config.spectrumMax, Math.round(Config.spectrumMax * (+instrumentObject["spectrum"][i]) / 100)));
                }
            }
            else {
                this.spectrumWave.reset(isNoiseChannel);
            }
            if (instrumentObject["stringSustain"] != undefined) {
                this.stringSustain = clamp(0, Config.stringSustainRange, Math.round((Config.stringSustainRange - 1) * (instrumentObject["stringSustain"] | 0) / 100));
            }
            else {
                this.stringSustain = 10;
            }
            if (this.type == 2) {
                this.chipNoise = Config.chipNoises.findIndex(wave => wave.name == instrumentObject["wave"]);
                if (this.chipNoise == -1)
                    this.chipNoise = 1;
            }
            const legacyEnvelopeNames = { "custom": "note size", "steady": "none", "pluck 1": "twang 1", "pluck 2": "twang 2", "pluck 3": "twang 3" };
            const getEnvelope = (name) => (legacyEnvelopeNames[name] != undefined) ? Config.envelopes.dictionary[legacyEnvelopeNames[name]] : Config.envelopes.dictionary[name];
            if (this.type == 4) {
                if (instrumentObject["drums"] != undefined) {
                    for (let j = 0; j < Config.drumCount; j++) {
                        const drum = instrumentObject["drums"][j];
                        if (drum == undefined)
                            continue;
                        this.drumsetEnvelopes[j] = Config.envelopes.dictionary["twang 2"].index;
                        if (drum["filterEnvelope"] != undefined) {
                            const envelope = getEnvelope(drum["filterEnvelope"]);
                            if (envelope != undefined)
                                this.drumsetEnvelopes[j] = envelope.index;
                        }
                        if (drum["spectrum"] != undefined) {
                            for (let i = 0; i < Config.spectrumControlPoints; i++) {
                                this.drumsetSpectrumWaves[j].spectrum[i] = Math.max(0, Math.min(Config.spectrumMax, Math.round(Config.spectrumMax * (+drum["spectrum"][i]) / 100)));
                            }
                        }
                    }
                }
            }
            if (this.type == 0) {
                const legacyWaveNames = { "triangle": 1, "square": 2, "pulse wide": 3, "pulse narrow": 4, "sawtooth": 5, "double saw": 6, "double pulse": 7, "spiky": 8, "plateau": 0 };
                this.chipWave = legacyWaveNames[instrumentObject["wave"]] != undefined ? legacyWaveNames[instrumentObject["wave"]] : Config.chipWaves.findIndex(wave => wave.name == instrumentObject["wave"]);
                if (this.chipWave == -1)
                    this.chipWave = 1;
            }
            if (this.type == 1) {
                this.algorithm = Config.algorithms.findIndex(algorithm => algorithm.name == instrumentObject["algorithm"]);
                if (this.algorithm == -1)
                    this.algorithm = 0;
                this.feedbackType = Config.feedbacks.findIndex(feedback => feedback.name == instrumentObject["feedbackType"]);
                if (this.feedbackType == -1)
                    this.feedbackType = 0;
                if (instrumentObject["feedbackAmplitude"] != undefined) {
                    this.feedbackAmplitude = clamp(0, Config.operatorAmplitudeMax + 1, instrumentObject["feedbackAmplitude"] | 0);
                }
                else {
                    this.feedbackAmplitude = 0;
                }
                for (let j = 0; j < Config.operatorCount; j++) {
                    const operator = this.operators[j];
                    let operatorObject = undefined;
                    if (instrumentObject["operators"] != undefined)
                        operatorObject = instrumentObject["operators"][j];
                    if (operatorObject == undefined)
                        operatorObject = {};
                    operator.frequency = Config.operatorFrequencies.findIndex(freq => freq.name == operatorObject["frequency"]);
                    if (operator.frequency == -1)
                        operator.frequency = 0;
                    if (operatorObject["amplitude"] != undefined) {
                        operator.amplitude = clamp(0, Config.operatorAmplitudeMax + 1, operatorObject["amplitude"] | 0);
                    }
                    else {
                        operator.amplitude = 0;
                    }
                    if (operatorObject["waveform"] != undefined) {
                        operator.waveform = Config.operatorWaves.findIndex(wave => wave.name == operatorObject["waveform"]);
                        if (operator.waveform == -1) {
                            if (operatorObject["waveform"] == "square") {
                                operator.waveform = Config.operatorWaves.dictionary["pulse width"].index;
                                operator.pulseWidth = 5;
                            }
                            else {
                                operator.waveform = 0;
                            }
                        }
                    }
                    else {
                        operator.waveform = 0;
                    }
                    if (operatorObject["pulseWidth"] != undefined) {
                        operator.pulseWidth = operatorObject["pulseWidth"] | 0;
                    }
                    else {
                        operator.pulseWidth = 5;
                    }
                }
            }
            else if (this.type == 8) {
                if (instrumentObject["customChipWave"]) {
                    for (let i = 0; i < 64; i++) {
                        this.customChipWave[i] = instrumentObject["customChipWave"][i];
                    }
                    let sum = 0.0;
                    for (let i = 0; i < this.customChipWave.length; i++) {
                        sum += this.customChipWave[i];
                    }
                    const average = sum / this.customChipWave.length;
                    let cumulative = 0;
                    let wavePrev = 0;
                    for (let i = 0; i < this.customChipWave.length; i++) {
                        cumulative += wavePrev;
                        wavePrev = this.customChipWave[i] - average;
                        this.customChipWaveIntegral[i] = cumulative;
                    }
                    this.customChipWaveIntegral[64] = 0.0;
                }
            }
            else if (this.type == 9) {
                if (instrumentObject["modChannels"] != undefined) {
                    for (let mod = 0; mod < Config.modCount; mod++) {
                        this.modChannels[mod] = instrumentObject["modChannels"][mod];
                        this.modInstruments[mod] = instrumentObject["modInstruments"][mod];
                        this.modulators[mod] = instrumentObject["modSettings"][mod];
                    }
                }
            }
            if (this.type != 9) {
                if (this.chord == Config.chords.dictionary["arpeggio"].index && instrumentObject["arpeggioSpeed"] != undefined) {
                    this.arpeggioSpeed = instrumentObject["arpeggioSpeed"];
                }
                else {
                    this.arpeggioSpeed = (useSlowerRhythm) ? 9 : 12;
                }
                if (instrumentObject["fastTwoNoteArp"] != undefined) {
                    this.fastTwoNoteArp = instrumentObject["fastTwoNoteArp"];
                }
                else {
                    this.fastTwoNoteArp = useFastTwoNoteArp;
                }
                if (instrumentObject["clicklessTransition"] != undefined) {
                    this.clicklessTransition = instrumentObject["clicklessTransition"];
                }
                else {
                    this.clicklessTransition = false;
                }
                if (instrumentObject["aliases"] != undefined) {
                    this.aliases = instrumentObject["aliases"];
                }
                else {
                    this.aliases = false;
                }
                if (instrumentObject["noteFilterType"] != undefined) {
                    this.noteFilterType = instrumentObject["noteFilterType"];
                }
                if (instrumentObject["noteSimpleCut"] != undefined) {
                    this.noteFilterSimpleCut = instrumentObject["noteSimpleCut"];
                }
                if (instrumentObject["noteSimplePeak"] != undefined) {
                    this.noteFilterSimplePeak = instrumentObject["noteSimplePeak"];
                }
                if (instrumentObject["noteFilter"] != undefined) {
                    this.noteFilter.fromJsonObject(instrumentObject["noteFilter"]);
                }
                else {
                    this.noteFilter.reset();
                }
                for (let i = 0; i < Config.filterMorphCount; i++) {
                    if (Array.isArray(instrumentObject["noteSubFilters" + i])) {
                        this.noteSubFilters[i] = new FilterSettings();
                        this.noteSubFilters[i].fromJsonObject(instrumentObject["noteSubFilters" + i]);
                    }
                }
                if (instrumentObject["eqFilterType"] != undefined) {
                    this.eqFilterType = instrumentObject["eqFilterType"];
                }
                if (instrumentObject["eqSimpleCut"] != undefined) {
                    this.eqFilterSimpleCut = instrumentObject["eqSimpleCut"];
                }
                if (instrumentObject["eqSimplePeak"] != undefined) {
                    this.eqFilterSimplePeak = instrumentObject["eqSimplePeak"];
                }
                if (Array.isArray(instrumentObject["eqFilter"])) {
                    this.eqFilter.fromJsonObject(instrumentObject["eqFilter"]);
                }
                else {
                    this.eqFilter.reset();
                    const legacySettings = {};
                    const filterCutoffMaxHz = 8000;
                    const filterCutoffRange = 11;
                    const filterResonanceRange = 8;
                    if (instrumentObject["filterCutoffHz"] != undefined) {
                        legacySettings.filterCutoff = clamp(0, filterCutoffRange, Math.round((filterCutoffRange - 1) + 2.0 * Math.log((instrumentObject["filterCutoffHz"] | 0) / filterCutoffMaxHz) / Math.LN2));
                    }
                    else {
                        legacySettings.filterCutoff = (this.type == 0) ? 6 : 10;
                    }
                    if (instrumentObject["filterResonance"] != undefined) {
                        legacySettings.filterResonance = clamp(0, filterResonanceRange, Math.round((filterResonanceRange - 1) * (instrumentObject["filterResonance"] | 0) / 100));
                    }
                    else {
                        legacySettings.filterResonance = 0;
                    }
                    legacySettings.filterEnvelope = getEnvelope(instrumentObject["filterEnvelope"]);
                    legacySettings.pulseEnvelope = getEnvelope(instrumentObject["pulseEnvelope"]);
                    legacySettings.feedbackEnvelope = getEnvelope(instrumentObject["feedbackEnvelope"]);
                    if (Array.isArray(instrumentObject["operators"])) {
                        legacySettings.operatorEnvelopes = [];
                        for (let j = 0; j < Config.operatorCount; j++) {
                            let envelope;
                            if (instrumentObject["operators"][j] != undefined) {
                                envelope = getEnvelope(instrumentObject["operators"][j]["envelope"]);
                            }
                            legacySettings.operatorEnvelopes[j] = (envelope != undefined) ? envelope : Config.envelopes.dictionary["none"];
                        }
                    }
                    if (instrumentObject["filter"] != undefined) {
                        const legacyToCutoff = [10, 6, 3, 0, 8, 5, 2];
                        const legacyToEnvelope = ["none", "none", "none", "none", "decay 1", "decay 2", "decay 3"];
                        const filterNames = ["none", "bright", "medium", "soft", "decay bright", "decay medium", "decay soft"];
                        const oldFilterNames = { "sustain sharp": 1, "sustain medium": 2, "sustain soft": 3, "decay sharp": 4 };
                        let legacyFilter = oldFilterNames[instrumentObject["filter"]] != undefined ? oldFilterNames[instrumentObject["filter"]] : filterNames.indexOf(instrumentObject["filter"]);
                        if (legacyFilter == -1)
                            legacyFilter = 0;
                        legacySettings.filterCutoff = legacyToCutoff[legacyFilter];
                        legacySettings.filterEnvelope = getEnvelope(legacyToEnvelope[legacyFilter]);
                        legacySettings.filterResonance = 0;
                    }
                    this.convertLegacySettings(legacySettings, true);
                }
                if (instrumentObject["invertWave"] != undefined) {
                    this.invertWave = instrumentObject["invertWave"];
                }
                else {
                    this.invertWave = false;
                }
                for (let i = 0; i < Config.filterMorphCount; i++) {
                    if (Array.isArray(instrumentObject["eqSubFilters" + i])) {
                        this.eqSubFilters[i] = new FilterSettings();
                        this.eqSubFilters[i].fromJsonObject(instrumentObject["eqSubFilters" + i]);
                    }
                }
                if (Array.isArray(instrumentObject["envelopes"])) {
                    const envelopeArray = instrumentObject["envelopes"];
                    for (let i = 0; i < envelopeArray.length; i++) {
                        if (this.envelopeCount >= Config.maxEnvelopeCount)
                            break;
                        const tempEnvelope = new EnvelopeSettings();
                        tempEnvelope.fromJsonObject(envelopeArray[i]);
                        this.addEnvelope(tempEnvelope.target, tempEnvelope.index, tempEnvelope.envelope);
                    }
                }
                this.invertWave = instrumentObject["invertWave"];
            }
        }
        static frequencyFromPitch(pitch) {
            return 440.0 * Math.pow(2.0, (pitch - 69.0) / 12.0);
        }
        addEnvelope(target, index, envelope) {
            let makeEmpty = false;
            if (!this.supportsEnvelopeTarget(target, index))
                makeEmpty = true;
            if (this.envelopeCount >= Config.maxEnvelopeCount)
                throw new Error();
            while (this.envelopes.length <= this.envelopeCount)
                this.envelopes[this.envelopes.length] = new EnvelopeSettings();
            const envelopeSettings = this.envelopes[this.envelopeCount];
            envelopeSettings.target = makeEmpty ? Config.instrumentAutomationTargets.dictionary["none"].index : target;
            envelopeSettings.index = makeEmpty ? 0 : index;
            envelopeSettings.envelope = envelope;
            this.envelopeCount++;
        }
        supportsEnvelopeTarget(target, index) {
            const automationTarget = Config.instrumentAutomationTargets[target];
            if (index >= automationTarget.maxCount) {
                return false;
            }
            if (automationTarget.compatibleInstruments != null && automationTarget.compatibleInstruments.indexOf(this.type) == -1) {
                return false;
            }
            if (automationTarget.effect != null && (this.effects & (1 << automationTarget.effect)) == 0) {
                return false;
            }
            if (automationTarget.isFilter) {
                let useControlPointCount = this.noteFilter.controlPointCount;
                if (this.noteFilterType)
                    useControlPointCount = 1;
                if (index >= useControlPointCount)
                    return false;
            }
            return true;
        }
        clearInvalidEnvelopeTargets() {
            for (let envelopeIndex = 0; envelopeIndex < this.envelopeCount; envelopeIndex++) {
                const target = this.envelopes[envelopeIndex].target;
                const index = this.envelopes[envelopeIndex].index;
                if (!this.supportsEnvelopeTarget(target, index)) {
                    this.envelopes[envelopeIndex].target = Config.instrumentAutomationTargets.dictionary["none"].index;
                    this.envelopes[envelopeIndex].index = 0;
                }
            }
        }
        getTransition() {
            return effectsIncludeTransition(this.effects) ? Config.transitions[this.transition] :
                (this.type == 9 ? Config.transitions.dictionary["interrupt"] : Config.transitions.dictionary["normal"]);
        }
        getFadeInSeconds() {
            return (this.type == 4) ? 0.0 : Synth.fadeInSettingToSeconds(this.fadeIn);
        }
        getFadeOutTicks() {
            return (this.type == 4) ? Config.drumsetFadeOutTicks : Synth.fadeOutSettingToTicks(this.fadeOut);
        }
        getChord() {
            return effectsIncludeChord(this.effects) ? Config.chords[this.chord] : Config.chords.dictionary["simultaneous"];
        }
        getDrumsetEnvelope(pitch) {
            if (this.type != 4)
                throw new Error("Can't getDrumsetEnvelope() for non-drumset.");
            return Config.envelopes[this.drumsetEnvelopes[pitch]];
        }
    }
    class Channel {
        constructor() {
            this.octave = 0;
            this.instruments = [];
            this.patterns = [];
            this.bars = [];
            this.muted = false;
            this.name = "";
        }
    }
    class Song {
        constructor(string) {
            this.channels = [];
            this.limitDecay = 4.0;
            this.limitRise = 4000.0;
            this.compressionThreshold = 1.0;
            this.limitThreshold = 1.0;
            this.compressionRatio = 1.0;
            this.limitRatio = 1.0;
            this.masterGain = 1.0;
            this.inVolumeCap = 0.0;
            this.outVolumeCap = 0.0;
            this.getNewNoteVolume = (isMod, modChannel, modInstrument, modCount) => {
                if (!isMod || modChannel == undefined || modInstrument == undefined || modCount == undefined)
                    return 6;
                else {
                    modCount = Config.modCount - modCount - 1;
                    let vol = Config.modulators[this.channels[modChannel].instruments[modInstrument].modulators[modCount]].newNoteVol;
                    let tempoIndex = Config.modulators.dictionary["tempo"].index;
                    if (this.channels[modChannel].instruments[modInstrument].modulators[modCount] == tempoIndex) {
                        vol = this.tempo - Config.modulators[tempoIndex].convertRealFactor;
                    }
                    if (vol != undefined)
                        return vol;
                    else
                        return 6;
                }
            };
            this.getVolumeCap = (isMod, modChannel, modInstrument, modCount) => {
                if (!isMod || modChannel == undefined || modInstrument == undefined || modCount == undefined)
                    return 6;
                else {
                    modCount = Config.modCount - modCount - 1;
                    let instrument = this.channels[modChannel].instruments[modInstrument];
                    let modulator = Config.modulators[instrument.modulators[modCount]];
                    let cap = modulator.maxRawVol;
                    if (cap != undefined) {
                        if (modulator.name == "eq filter" || modulator.name == "note filter") {
                            cap = Config.filterMorphCount - 1;
                            if (instrument.modFilterTypes[modCount] > 0 && instrument.modFilterTypes[modCount] % 2) {
                                cap = Config.filterFreqRange;
                            }
                            else if (instrument.modFilterTypes[modCount] > 0) {
                                cap = Config.filterGainRange;
                            }
                        }
                        return cap;
                    }
                    else
                        return 6;
                }
            };
            this.getVolumeCapForSetting = (isMod, modSetting, filterType) => {
                if (!isMod)
                    return Config.noteSizeMax;
                else {
                    let cap = Config.modulators[modSetting].maxRawVol;
                    if (cap != undefined) {
                        if (filterType != undefined && (Config.modulators[modSetting].name == "eq filter" || Config.modulators[modSetting].name == "note filter")) {
                            cap = Config.filterMorphCount - 1;
                            if (filterType > 0 && filterType % 2) {
                                cap = Config.filterFreqRange;
                            }
                            else if (filterType > 0) {
                                cap = Config.filterGainRange;
                            }
                        }
                        return cap;
                    }
                    else
                        return Config.noteSizeMax;
                }
            };
            if (string != undefined) {
                this.fromBase64String(string);
            }
            else {
                this.initToDefault(true);
            }
        }
        getChannelCount() {
            return this.pitchChannelCount + this.noiseChannelCount + this.modChannelCount;
        }
        getMaxInstrumentsPerChannel() {
            return Math.max(this.layeredInstruments ? Config.layeredInstrumentCountMax : Config.instrumentCountMin, this.patternInstruments ? Config.patternInstrumentCountMax : Config.instrumentCountMin);
        }
        getMaxInstrumentsPerPattern(channelIndex) {
            return this.getMaxInstrumentsPerPatternForChannel(this.channels[channelIndex]);
        }
        getMaxInstrumentsPerPatternForChannel(channel) {
            return this.layeredInstruments
                ? Math.min(Config.layeredInstrumentCountMax, channel.instruments.length)
                : 1;
        }
        getChannelIsNoise(channelIndex) {
            return (channelIndex >= this.pitchChannelCount && channelIndex < this.pitchChannelCount + this.noiseChannelCount);
        }
        getChannelIsMod(channelIndex) {
            return (channelIndex >= this.pitchChannelCount + this.noiseChannelCount);
        }
        initToDefault(andResetChannels = true) {
            this.scale = 0;
            this.key = 0;
            this.loopStart = 0;
            this.loopLength = 4;
            this.tempo = 150;
            this.reverb = 0;
            this.beatsPerBar = 8;
            this.barCount = 16;
            this.patternsPerChannel = 8;
            this.rhythm = 1;
            this.layeredInstruments = false;
            this.patternInstruments = false;
            this.title = "Unnamed";
            document.title = EditorConfig.versionDisplayName;
            if (andResetChannels) {
                this.pitchChannelCount = 3;
                this.noiseChannelCount = 1;
                this.modChannelCount = 0;
                for (let channelIndex = 0; channelIndex < this.getChannelCount(); channelIndex++) {
                    const isNoiseChannel = channelIndex >= this.pitchChannelCount && channelIndex < this.pitchChannelCount + this.noiseChannelCount;
                    const isModChannel = channelIndex >= this.pitchChannelCount + this.noiseChannelCount;
                    if (this.channels.length <= channelIndex) {
                        this.channels[channelIndex] = new Channel();
                    }
                    const channel = this.channels[channelIndex];
                    channel.octave = Math.max(3 - channelIndex, 0);
                    for (let pattern = 0; pattern < this.patternsPerChannel; pattern++) {
                        if (channel.patterns.length <= pattern) {
                            channel.patterns[pattern] = new Pattern();
                        }
                        else {
                            channel.patterns[pattern].reset();
                        }
                    }
                    channel.patterns.length = this.patternsPerChannel;
                    for (let instrument = 0; instrument < Config.instrumentCountMin; instrument++) {
                        if (channel.instruments.length <= instrument) {
                            channel.instruments[instrument] = new Instrument(isNoiseChannel, isModChannel);
                        }
                        channel.instruments[instrument].setTypeAndReset(isModChannel ? 9 : (isNoiseChannel ? 2 : 0), isNoiseChannel, isModChannel);
                    }
                    channel.instruments.length = Config.instrumentCountMin;
                    for (let bar = 0; bar < this.barCount; bar++) {
                        channel.bars[bar] = bar < 4 ? 1 : 0;
                    }
                    channel.bars.length = this.barCount;
                }
                this.channels.length = this.getChannelCount();
            }
        }
        toBase64String() {
            let bits;
            let buffer = [];
            buffer.push(Song._variant);
            buffer.push(base64IntToCharCode[Song._latestJummBoxVersion]);
            buffer.push(78);
            var encodedSongTitle = encodeURIComponent(this.title);
            buffer.push(base64IntToCharCode[encodedSongTitle.length >> 6], base64IntToCharCode[encodedSongTitle.length & 0x3f]);
            for (let i = 0; i < encodedSongTitle.length; i++) {
                buffer.push(encodedSongTitle.charCodeAt(i));
            }
            buffer.push(110, base64IntToCharCode[this.pitchChannelCount], base64IntToCharCode[this.noiseChannelCount], base64IntToCharCode[this.modChannelCount]);
            buffer.push(115, base64IntToCharCode[this.scale]);
            buffer.push(107, base64IntToCharCode[this.key]);
            buffer.push(108, base64IntToCharCode[this.loopStart >> 6], base64IntToCharCode[this.loopStart & 0x3f]);
            buffer.push(101, base64IntToCharCode[(this.loopLength - 1) >> 6], base64IntToCharCode[(this.loopLength - 1) & 0x3f]);
            buffer.push(116, base64IntToCharCode[this.tempo >> 6], base64IntToCharCode[this.tempo & 0x3F]);
            buffer.push(97, base64IntToCharCode[this.beatsPerBar - 1]);
            buffer.push(103, base64IntToCharCode[(this.barCount - 1) >> 6], base64IntToCharCode[(this.barCount - 1) & 0x3f]);
            buffer.push(106, base64IntToCharCode[(this.patternsPerChannel - 1) >> 6], base64IntToCharCode[(this.patternsPerChannel - 1) & 0x3f]);
            buffer.push(114, base64IntToCharCode[this.rhythm]);
            buffer.push(79);
            if (this.compressionRatio != 1.0 || this.limitRatio != 1.0 || this.limitRise != 4000.0 || this.limitDecay != 4.0 || this.limitThreshold != 1.0 || this.compressionThreshold != 1.0 || this.masterGain != 1.0) {
                buffer.push(base64IntToCharCode[Math.round(this.compressionRatio < 1 ? this.compressionRatio * 10 : 10 + (this.compressionRatio - 1) * 60)]);
                buffer.push(base64IntToCharCode[Math.round(this.limitRatio < 1 ? this.limitRatio * 10 : 9 + this.limitRatio)]);
                buffer.push(base64IntToCharCode[this.limitDecay]);
                buffer.push(base64IntToCharCode[Math.round((this.limitRise - 2000.0) / 250.0)]);
                buffer.push(base64IntToCharCode[Math.round(this.compressionThreshold * 20)]);
                buffer.push(base64IntToCharCode[Math.round(this.limitThreshold * 20)]);
                buffer.push(base64IntToCharCode[Math.round(this.masterGain * 50) >> 6], base64IntToCharCode[Math.round(this.masterGain * 50) & 0x3f]);
            }
            else {
                buffer.push(base64IntToCharCode[0x3f]);
            }
            buffer.push(85);
            for (let channel = 0; channel < this.getChannelCount(); channel++) {
                var encodedChannelName = encodeURIComponent(this.channels[channel].name);
                buffer.push(base64IntToCharCode[encodedChannelName.length >> 6], base64IntToCharCode[encodedChannelName.length & 0x3f]);
                for (let i = 0; i < encodedChannelName.length; i++) {
                    buffer.push(encodedChannelName.charCodeAt(i));
                }
            }
            buffer.push(105, base64IntToCharCode[(this.layeredInstruments << 1) | this.patternInstruments]);
            if (this.layeredInstruments || this.patternInstruments) {
                for (let channelIndex = 0; channelIndex < this.getChannelCount(); channelIndex++) {
                    buffer.push(base64IntToCharCode[this.channels[channelIndex].instruments.length - Config.instrumentCountMin]);
                }
            }
            buffer.push(111);
            for (let channelIndex = 0; channelIndex < this.pitchChannelCount; channelIndex++) {
                buffer.push(base64IntToCharCode[this.channels[channelIndex].octave]);
            }
            for (let channelIndex = 0; channelIndex < this.getChannelCount(); channelIndex++) {
                for (let i = 0; i < this.channels[channelIndex].instruments.length; i++) {
                    const instrument = this.channels[channelIndex].instruments[i];
                    buffer.push(84, base64IntToCharCode[instrument.type]);
                    buffer.push(118, base64IntToCharCode[(instrument.volume + Config.volumeRange / 2) >> 6], base64IntToCharCode[(instrument.volume + Config.volumeRange / 2) & 0x3f]);
                    buffer.push(117, base64IntToCharCode[instrument.preset >> 6], base64IntToCharCode[instrument.preset & 63]);
                    buffer.push(102);
                    buffer.push(base64IntToCharCode[+instrument.eqFilterType]);
                    if (instrument.eqFilterType) {
                        buffer.push(base64IntToCharCode[instrument.eqFilterSimpleCut]);
                        buffer.push(base64IntToCharCode[instrument.eqFilterSimplePeak]);
                    }
                    else {
                        if (instrument.eqFilter == null) {
                            buffer.push(base64IntToCharCode[0]);
                            console.log("Null EQ filter settings detected in toBase64String for channelIndex " + channelIndex + ", instrumentIndex " + i);
                        }
                        else {
                            buffer.push(base64IntToCharCode[instrument.eqFilter.controlPointCount]);
                            for (let j = 0; j < instrument.eqFilter.controlPointCount; j++) {
                                const point = instrument.eqFilter.controlPoints[j];
                                buffer.push(base64IntToCharCode[point.type], base64IntToCharCode[Math.round(point.freq)], base64IntToCharCode[Math.round(point.gain)]);
                            }
                        }
                        let usingSubFilterBitfield = 0;
                        for (let j = 0; j < Config.filterMorphCount - 1; j++) {
                            usingSubFilterBitfield |= (+(instrument.eqSubFilters[j + 1] != null) << j);
                        }
                        buffer.push(base64IntToCharCode[usingSubFilterBitfield >> 6], base64IntToCharCode[usingSubFilterBitfield & 63]);
                        for (let j = 0; j < Config.filterMorphCount - 1; j++) {
                            if (usingSubFilterBitfield & (1 << j)) {
                                buffer.push(base64IntToCharCode[instrument.eqSubFilters[j + 1].controlPointCount]);
                                for (let k = 0; k < instrument.eqSubFilters[j + 1].controlPointCount; k++) {
                                    const point = instrument.eqSubFilters[j + 1].controlPoints[k];
                                    buffer.push(base64IntToCharCode[point.type], base64IntToCharCode[Math.round(point.freq)], base64IntToCharCode[Math.round(point.gain)]);
                                }
                            }
                        }
                    }
                    buffer.push(113, base64IntToCharCode[instrument.effects >> 6], base64IntToCharCode[instrument.effects & 63]);
                    if (effectsIncludeNoteFilter(instrument.effects)) {
                        buffer.push(base64IntToCharCode[+instrument.noteFilterType]);
                        if (instrument.noteFilterType) {
                            buffer.push(base64IntToCharCode[instrument.noteFilterSimpleCut]);
                            buffer.push(base64IntToCharCode[instrument.noteFilterSimplePeak]);
                        }
                        else {
                            if (instrument.noteFilter == null) {
                                buffer.push(base64IntToCharCode[0]);
                                console.log("Null note filter settings detected in toBase64String for channelIndex " + channelIndex + ", instrumentIndex " + i);
                            }
                            else {
                                buffer.push(base64IntToCharCode[instrument.noteFilter.controlPointCount]);
                                for (let j = 0; j < instrument.noteFilter.controlPointCount; j++) {
                                    const point = instrument.noteFilter.controlPoints[j];
                                    buffer.push(base64IntToCharCode[point.type], base64IntToCharCode[Math.round(point.freq)], base64IntToCharCode[Math.round(point.gain)]);
                                }
                            }
                            let usingSubFilterBitfield = 0;
                            for (let j = 0; j < Config.filterMorphCount - 1; j++) {
                                usingSubFilterBitfield |= (+(instrument.noteSubFilters[j + 1] != null) << j);
                            }
                            buffer.push(base64IntToCharCode[usingSubFilterBitfield >> 6], base64IntToCharCode[usingSubFilterBitfield & 63]);
                            for (let j = 0; j < Config.filterMorphCount - 1; j++) {
                                if (usingSubFilterBitfield & (1 << j)) {
                                    buffer.push(base64IntToCharCode[instrument.noteSubFilters[j + 1].controlPointCount]);
                                    for (let k = 0; k < instrument.noteSubFilters[j + 1].controlPointCount; k++) {
                                        const point = instrument.noteSubFilters[j + 1].controlPoints[k];
                                        buffer.push(base64IntToCharCode[point.type], base64IntToCharCode[Math.round(point.freq)], base64IntToCharCode[Math.round(point.gain)]);
                                    }
                                }
                            }
                        }
                    }
                    if (effectsIncludeTransition(instrument.effects)) {
                        buffer.push(base64IntToCharCode[instrument.transition]);
                    }
                    if (effectsIncludeChord(instrument.effects)) {
                        buffer.push(base64IntToCharCode[instrument.chord]);
                        if (instrument.chord == Config.chords.dictionary["arpeggio"].index) {
                            buffer.push(base64IntToCharCode[instrument.arpeggioSpeed]);
                            buffer.push(base64IntToCharCode[+instrument.fastTwoNoteArp]);
                        }
                    }
                    if (effectsIncludePitchShift(instrument.effects)) {
                        buffer.push(base64IntToCharCode[instrument.pitchShift]);
                    }
                    if (effectsIncludeDetune(instrument.effects)) {
                        buffer.push(base64IntToCharCode[(instrument.detune - Config.detuneMin) >> 6], base64IntToCharCode[(instrument.detune - Config.detuneMin) & 0x3F]);
                    }
                    if (effectsIncludeVibrato(instrument.effects)) {
                        buffer.push(base64IntToCharCode[instrument.vibrato]);
                        if (instrument.vibrato == Config.vibratos.length) {
                            buffer.push(base64IntToCharCode[Math.round(instrument.vibratoDepth * 25)]);
                            buffer.push(base64IntToCharCode[instrument.vibratoSpeed]);
                            buffer.push(base64IntToCharCode[Math.round(instrument.vibratoDelay)]);
                            buffer.push(base64IntToCharCode[instrument.vibratoType]);
                        }
                    }
                    if (effectsIncludeDistortion(instrument.effects)) {
                        buffer.push(base64IntToCharCode[instrument.distortion]);
                        buffer.push(base64IntToCharCode[+instrument.aliases]);
                    }
                    if (effectsIncludeBitcrusher(instrument.effects)) {
                        buffer.push(base64IntToCharCode[instrument.bitcrusherFreq], base64IntToCharCode[instrument.bitcrusherQuantization]);
                    }
                    if (effectsIncludePanning(instrument.effects)) {
                        buffer.push(base64IntToCharCode[instrument.pan >> 6], base64IntToCharCode[instrument.pan & 0x3f]);
                        buffer.push(base64IntToCharCode[instrument.panDelay]);
                    }
                    if (effectsIncludeChorus(instrument.effects)) {
                        buffer.push(base64IntToCharCode[instrument.chorus]);
                    }
                    if (effectsIncludeEcho(instrument.effects)) {
                        buffer.push(base64IntToCharCode[instrument.echoSustain], base64IntToCharCode[instrument.echoDelay]);
                    }
                    if (effectsIncludeReverb(instrument.effects)) {
                        buffer.push(base64IntToCharCode[instrument.reverb]);
                    }
                    if (instrument.type != 4) {
                        buffer.push(100, base64IntToCharCode[instrument.fadeIn], base64IntToCharCode[instrument.fadeOut]);
                        buffer.push(base64IntToCharCode[+instrument.clicklessTransition]);
                    }
                    if (instrument.type == 5 || instrument.type == 7) {
                        buffer.push(72);
                        const harmonicsBits = new BitFieldWriter();
                        for (let i = 0; i < Config.harmonicsControlPoints; i++) {
                            harmonicsBits.write(Config.harmonicsControlPointBits, instrument.harmonicsWave.harmonics[i]);
                        }
                        harmonicsBits.encodeBase64(buffer);
                    }
                    if (instrument.type == 0) {
                        buffer.push(119, base64IntToCharCode[instrument.chipWave]);
                        buffer.push(104, base64IntToCharCode[instrument.unison]);
                    }
                    else if (instrument.type == 1) {
                        buffer.push(65, base64IntToCharCode[instrument.algorithm]);
                        buffer.push(70, base64IntToCharCode[instrument.feedbackType]);
                        buffer.push(66, base64IntToCharCode[instrument.feedbackAmplitude]);
                        buffer.push(81);
                        for (let o = 0; o < Config.operatorCount; o++) {
                            buffer.push(base64IntToCharCode[instrument.operators[o].frequency]);
                        }
                        buffer.push(80);
                        for (let o = 0; o < Config.operatorCount; o++) {
                            buffer.push(base64IntToCharCode[instrument.operators[o].amplitude]);
                        }
                        buffer.push(82);
                        for (let o = 0; o < Config.operatorCount; o++) {
                            buffer.push(base64IntToCharCode[instrument.operators[o].waveform]);
                            if (instrument.operators[o].waveform == 3) {
                                buffer.push(base64IntToCharCode[instrument.operators[o].pulseWidth]);
                            }
                        }
                    }
                    else if (instrument.type == 8) {
                        buffer.push(119, base64IntToCharCode[instrument.chipWave]);
                        buffer.push(104, base64IntToCharCode[instrument.unison]);
                        buffer.push(77);
                        for (let j = 0; j < 64; j++) {
                            buffer.push(base64IntToCharCode[(instrument.customChipWave[j] + 24)]);
                        }
                    }
                    else if (instrument.type == 2) {
                        buffer.push(119, base64IntToCharCode[instrument.chipNoise]);
                    }
                    else if (instrument.type == 3) {
                        buffer.push(83);
                        const spectrumBits = new BitFieldWriter();
                        for (let i = 0; i < Config.spectrumControlPoints; i++) {
                            spectrumBits.write(Config.spectrumControlPointBits, instrument.spectrumWave.spectrum[i]);
                        }
                        spectrumBits.encodeBase64(buffer);
                    }
                    else if (instrument.type == 4) {
                        buffer.push(122);
                        for (let j = 0; j < Config.drumCount; j++) {
                            buffer.push(base64IntToCharCode[instrument.drumsetEnvelopes[j]]);
                        }
                        buffer.push(83);
                        const spectrumBits = new BitFieldWriter();
                        for (let j = 0; j < Config.drumCount; j++) {
                            for (let i = 0; i < Config.spectrumControlPoints; i++) {
                                spectrumBits.write(Config.spectrumControlPointBits, instrument.drumsetSpectrumWaves[j].spectrum[i]);
                            }
                        }
                        spectrumBits.encodeBase64(buffer);
                    }
                    else if (instrument.type == 5) {
                        buffer.push(104, base64IntToCharCode[instrument.unison]);
                    }
                    else if (instrument.type == 6) {
                        buffer.push(87, base64IntToCharCode[instrument.pulseWidth]);
                    }
                    else if (instrument.type == 7) {
                        buffer.push(104, base64IntToCharCode[instrument.unison]);
                        buffer.push(73, base64IntToCharCode[instrument.stringSustain]);
                    }
                    else if (instrument.type == 9) ;
                    else {
                        throw new Error("Unknown instrument type.");
                    }
                    buffer.push(69, base64IntToCharCode[instrument.envelopeCount]);
                    for (let envelopeIndex = 0; envelopeIndex < instrument.envelopeCount; envelopeIndex++) {
                        buffer.push(base64IntToCharCode[instrument.envelopes[envelopeIndex].target]);
                        if (Config.instrumentAutomationTargets[instrument.envelopes[envelopeIndex].target].maxCount > 1) {
                            buffer.push(base64IntToCharCode[instrument.envelopes[envelopeIndex].index]);
                        }
                        buffer.push(base64IntToCharCode[instrument.envelopes[envelopeIndex].envelope]);
                    }
                    buffer.push(89, base64IntToCharCode[+instrument.invertWave]);
                }
            }
            buffer.push(98);
            bits = new BitFieldWriter();
            let neededBits = 0;
            while ((1 << neededBits) < this.patternsPerChannel + 1)
                neededBits++;
            for (let channelIndex = 0; channelIndex < this.getChannelCount(); channelIndex++)
                for (let i = 0; i < this.barCount; i++) {
                    bits.write(neededBits, this.channels[channelIndex].bars[i]);
                }
            bits.encodeBase64(buffer);
            buffer.push(112);
            bits = new BitFieldWriter();
            const shapeBits = new BitFieldWriter();
            const bitsPerNoteSize = Song.getNeededBits(Config.noteSizeMax);
            for (let channelIndex = 0; channelIndex < this.getChannelCount(); channelIndex++) {
                const channel = this.channels[channelIndex];
                const maxInstrumentsPerPattern = this.getMaxInstrumentsPerPattern(channelIndex);
                const isNoiseChannel = this.getChannelIsNoise(channelIndex);
                const isModChannel = this.getChannelIsMod(channelIndex);
                const neededInstrumentCountBits = Song.getNeededBits(maxInstrumentsPerPattern - Config.instrumentCountMin);
                const neededInstrumentIndexBits = Song.getNeededBits(channel.instruments.length - 1);
                if (isModChannel) {
                    const neededModInstrumentIndexBits = Song.getNeededBits(this.getMaxInstrumentsPerChannel() + 2);
                    for (let instrumentIndex = 0; instrumentIndex < channel.instruments.length; instrumentIndex++) {
                        let instrument = this.channels[channelIndex].instruments[instrumentIndex];
                        for (let mod = 0; mod < Config.modCount; mod++) {
                            const modChannel = instrument.modChannels[mod];
                            const modInstrument = instrument.modInstruments[mod];
                            const modSetting = instrument.modulators[mod];
                            const modFilter = instrument.modFilterTypes[mod];
                            let status = Config.modulators[modSetting].forSong ? 2 : 0;
                            if (modSetting == Config.modulators.dictionary["none"].index)
                                status = 3;
                            bits.write(2, status);
                            if (status == 0 || status == 1) {
                                bits.write(8, modChannel);
                                bits.write(neededModInstrumentIndexBits, modInstrument);
                            }
                            if (status != 3) {
                                bits.write(6, modSetting);
                            }
                            if (Config.modulators[instrument.modulators[mod]].name == "eq filter" || Config.modulators[instrument.modulators[mod]].name == "note filter") {
                                bits.write(6, modFilter);
                            }
                        }
                    }
                }
                const octaveOffset = (isNoiseChannel || isModChannel) ? 0 : channel.octave * Config.pitchesPerOctave;
                let lastPitch = (isNoiseChannel ? 4 : octaveOffset);
                const recentPitches = isModChannel ? [0, 1, 2, 3, 4, 5] : (isNoiseChannel ? [4, 6, 7, 2, 3, 8, 0, 10] : [0, 7, 12, 19, 24, -5, -12]);
                const recentShapes = [];
                for (let i = 0; i < recentPitches.length; i++) {
                    recentPitches[i] += octaveOffset;
                }
                for (const pattern of channel.patterns) {
                    if (this.patternInstruments) {
                        const instrumentCount = validateRange(Config.instrumentCountMin, maxInstrumentsPerPattern, pattern.instruments.length);
                        bits.write(neededInstrumentCountBits, instrumentCount - Config.instrumentCountMin);
                        for (let i = 0; i < instrumentCount; i++) {
                            bits.write(neededInstrumentIndexBits, pattern.instruments[i]);
                        }
                    }
                    if (pattern.notes.length > 0) {
                        bits.write(1, 1);
                        let curPart = 0;
                        for (const note of pattern.notes) {
                            if (note.start < curPart && isModChannel) {
                                bits.write(2, 0);
                                bits.write(1, 1);
                                bits.writePartDuration(curPart - note.start);
                            }
                            if (note.start > curPart) {
                                bits.write(2, 0);
                                if (isModChannel)
                                    bits.write(1, 0);
                                bits.writePartDuration(note.start - curPart);
                            }
                            shapeBits.clear();
                            if (note.pitches.length == 1) {
                                shapeBits.write(1, 0);
                            }
                            else {
                                shapeBits.write(1, 1);
                                shapeBits.write(3, note.pitches.length - 2);
                            }
                            shapeBits.writePinCount(note.pins.length - 1);
                            if (!isModChannel) {
                                shapeBits.write(bitsPerNoteSize, note.pins[0].size);
                            }
                            else {
                                shapeBits.write(9, note.pins[0].size);
                            }
                            let shapePart = 0;
                            let startPitch = note.pitches[0];
                            let currentPitch = startPitch;
                            const pitchBends = [];
                            for (let i = 1; i < note.pins.length; i++) {
                                const pin = note.pins[i];
                                const nextPitch = startPitch + pin.interval;
                                if (currentPitch != nextPitch) {
                                    shapeBits.write(1, 1);
                                    pitchBends.push(nextPitch);
                                    currentPitch = nextPitch;
                                }
                                else {
                                    shapeBits.write(1, 0);
                                }
                                shapeBits.writePartDuration(pin.time - shapePart);
                                shapePart = pin.time;
                                if (!isModChannel) {
                                    shapeBits.write(bitsPerNoteSize, pin.size);
                                }
                                else {
                                    shapeBits.write(9, pin.size);
                                }
                            }
                            const shapeString = String.fromCharCode.apply(null, shapeBits.encodeBase64([]));
                            const shapeIndex = recentShapes.indexOf(shapeString);
                            if (shapeIndex == -1) {
                                bits.write(2, 1);
                                bits.concat(shapeBits);
                            }
                            else {
                                bits.write(1, 1);
                                bits.writeLongTail(0, 0, shapeIndex);
                                recentShapes.splice(shapeIndex, 1);
                            }
                            recentShapes.unshift(shapeString);
                            if (recentShapes.length > 10)
                                recentShapes.pop();
                            const allPitches = note.pitches.concat(pitchBends);
                            for (let i = 0; i < allPitches.length; i++) {
                                const pitch = allPitches[i];
                                const pitchIndex = recentPitches.indexOf(pitch);
                                if (pitchIndex == -1) {
                                    let interval = 0;
                                    let pitchIter = lastPitch;
                                    if (pitchIter < pitch) {
                                        while (pitchIter != pitch) {
                                            pitchIter++;
                                            if (recentPitches.indexOf(pitchIter) == -1)
                                                interval++;
                                        }
                                    }
                                    else {
                                        while (pitchIter != pitch) {
                                            pitchIter--;
                                            if (recentPitches.indexOf(pitchIter) == -1)
                                                interval--;
                                        }
                                    }
                                    bits.write(1, 0);
                                    bits.writePitchInterval(interval);
                                }
                                else {
                                    bits.write(1, 1);
                                    bits.write(4, pitchIndex);
                                    recentPitches.splice(pitchIndex, 1);
                                }
                                recentPitches.unshift(pitch);
                                if (recentPitches.length > 16)
                                    recentPitches.pop();
                                if (i == note.pitches.length - 1) {
                                    lastPitch = note.pitches[0];
                                }
                                else {
                                    lastPitch = pitch;
                                }
                            }
                            if (note.start == 0) {
                                bits.write(1, note.continuesLastPattern ? 1 : 0);
                            }
                            curPart = note.end;
                        }
                        if (curPart < this.beatsPerBar * Config.partsPerBeat + (+isModChannel)) {
                            bits.write(2, 0);
                            if (isModChannel)
                                bits.write(1, 0);
                            bits.writePartDuration(this.beatsPerBar * Config.partsPerBeat + (+isModChannel) - curPart);
                        }
                    }
                    else {
                        bits.write(1, 0);
                    }
                }
            }
            let stringLength = bits.lengthBase64();
            let digits = [];
            while (stringLength > 0) {
                digits.unshift(base64IntToCharCode[stringLength & 0x3f]);
                stringLength = stringLength >> 6;
            }
            buffer.push(base64IntToCharCode[digits.length]);
            Array.prototype.push.apply(buffer, digits);
            bits.encodeBase64(buffer);
            const maxApplyArgs = 64000;
            if (buffer.length < maxApplyArgs) {
                return String.fromCharCode.apply(null, buffer);
            }
            else {
                let result = "";
                for (let i = 0; i < buffer.length; i += maxApplyArgs) {
                    result += String.fromCharCode.apply(null, buffer.slice(i, i + maxApplyArgs));
                }
                return result;
            }
        }
        static _envelopeFromLegacyIndex(legacyIndex) {
            if (legacyIndex == 0)
                legacyIndex = 1;
            else if (legacyIndex == 1)
                legacyIndex = 0;
            return Config.envelopes[clamp(0, Config.envelopes.length, legacyIndex)];
        }
        fromBase64String(compressed) {
            if (compressed == null || compressed == "") {
                this.initToDefault(true);
                return;
            }
            let charIndex = 0;
            while (compressed.charCodeAt(charIndex) <= 32)
                charIndex++;
            if (compressed.charCodeAt(charIndex) == 35)
                charIndex++;
            if (compressed.charCodeAt(charIndex) == 123) {
                this.fromJsonObject(JSON.parse(charIndex == 0 ? compressed : compressed.substring(charIndex)));
                return;
            }
            const variantTest = compressed.charCodeAt(charIndex);
            let fromBeepBox;
            let fromJummBox;
            if (variantTest == 0x6A) {
                fromBeepBox = false;
                fromJummBox = true;
                charIndex++;
            }
            else {
                fromBeepBox = true;
                fromJummBox = false;
            }
            const version = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
            if (fromBeepBox && (version == -1 || version > Song._latestBeepboxVersion || version < Song._oldestBeepboxVersion))
                return;
            if (fromJummBox && (version == -1 || version > Song._latestJummBoxVersion || version < Song._oldestJummBoxVersion))
                return;
            const beforeTwo = version < 2;
            const beforeThree = version < 3;
            const beforeFour = version < 4;
            const beforeFive = version < 5;
            const beforeSix = version < 6;
            const beforeSeven = version < 7;
            const beforeEight = version < 8;
            const beforeNine = version < 9;
            this.initToDefault((fromBeepBox && beforeNine) || (fromJummBox && beforeFive));
            const forceSimpleFilter = (fromBeepBox && beforeNine || fromJummBox && beforeFive);
            if (beforeThree && fromBeepBox) {
                for (const channel of this.channels) {
                    channel.instruments[0].transition = Config.transitions.dictionary["interrupt"].index;
                    channel.instruments[0].effects |= 1 << 10;
                }
                this.channels[3].instruments[0].chipNoise = 0;
            }
            let legacySettingsCache = null;
            if ((fromBeepBox && beforeNine) || (fromJummBox && beforeFive)) {
                legacySettingsCache = [];
                for (let i = legacySettingsCache.length; i < this.getChannelCount(); i++) {
                    legacySettingsCache[i] = [];
                    for (let j = 0; j < Config.instrumentCountMin; j++)
                        legacySettingsCache[i][j] = {};
                }
            }
            let legacyGlobalReverb = 0;
            let instrumentChannelIterator = 0;
            let instrumentIndexIterator = -1;
            let command;
            let useSlowerArpSpeed = false;
            let useFastTwoNoteArp = false;
            while (charIndex < compressed.length)
                switch (command = compressed.charCodeAt(charIndex++)) {
                    case 78:
                        {
                            var songNameLength = (base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) + base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                            this.title = decodeURIComponent(compressed.substring(charIndex, charIndex + songNameLength));
                            document.title = this.title + " - " + EditorConfig.versionDisplayName;
                            charIndex += songNameLength;
                        }
                        break;
                    case 110:
                        {
                            this.pitchChannelCount = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                            this.noiseChannelCount = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                            if (fromBeepBox || beforeTwo) {
                                this.modChannelCount = 0;
                            }
                            else {
                                this.modChannelCount = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                            }
                            this.pitchChannelCount = validateRange(Config.pitchChannelCountMin, Config.pitchChannelCountMax, this.pitchChannelCount);
                            this.noiseChannelCount = validateRange(Config.noiseChannelCountMin, Config.noiseChannelCountMax, this.noiseChannelCount);
                            this.modChannelCount = validateRange(Config.modChannelCountMin, Config.modChannelCountMax, this.modChannelCount);
                            for (let channelIndex = this.channels.length; channelIndex < this.getChannelCount(); channelIndex++) {
                                this.channels[channelIndex] = new Channel();
                            }
                            this.channels.length = this.getChannelCount();
                            if ((fromBeepBox && beforeNine) || (fromJummBox && beforeFive)) {
                                for (let i = legacySettingsCache.length; i < this.getChannelCount(); i++) {
                                    legacySettingsCache[i] = [];
                                    for (let j = 0; j < Config.instrumentCountMin; j++)
                                        legacySettingsCache[i][j] = {};
                                }
                            }
                        }
                        break;
                    case 115:
                        {
                            this.scale = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                            if (fromBeepBox)
                                this.scale = 0;
                        }
                        break;
                    case 107:
                        {
                            if (beforeSeven && fromBeepBox) {
                                this.key = clamp(0, Config.keys.length, 11 - base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                            }
                            else {
                                this.key = clamp(0, Config.keys.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                            }
                        }
                        break;
                    case 108:
                        {
                            if (beforeFive && fromBeepBox) {
                                this.loopStart = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                            }
                            else {
                                this.loopStart = (base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) + base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                            }
                        }
                        break;
                    case 101:
                        {
                            if (beforeFive && fromBeepBox) {
                                this.loopLength = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                            }
                            else {
                                this.loopLength = (base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) + base64CharCodeToInt[compressed.charCodeAt(charIndex++)] + 1;
                            }
                        }
                        break;
                    case 116:
                        {
                            if (beforeFour && fromBeepBox) {
                                this.tempo = [95, 120, 151, 190][base64CharCodeToInt[compressed.charCodeAt(charIndex++)]];
                            }
                            else if (beforeSeven && fromBeepBox) {
                                this.tempo = [88, 95, 103, 111, 120, 130, 140, 151, 163, 176, 190, 206, 222, 240, 259][base64CharCodeToInt[compressed.charCodeAt(charIndex++)]];
                            }
                            else {
                                this.tempo = (base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) | (base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                            }
                            this.tempo = clamp(Config.tempoMin, Config.tempoMax + 1, this.tempo);
                        }
                        break;
                    case 109:
                        {
                            if (beforeNine && fromBeepBox) {
                                legacyGlobalReverb = base64CharCodeToInt[compressed.charCodeAt(charIndex++)] * 12;
                                legacyGlobalReverb = clamp(0, Config.reverbRange, legacyGlobalReverb);
                            }
                            else if (beforeFive && fromJummBox) {
                                legacyGlobalReverb = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                legacyGlobalReverb = clamp(0, Config.reverbRange, legacyGlobalReverb);
                            }
                            else ;
                        }
                        break;
                    case 97:
                        {
                            if (beforeThree && fromBeepBox) {
                                this.beatsPerBar = [6, 7, 8, 9, 10][base64CharCodeToInt[compressed.charCodeAt(charIndex++)]];
                            }
                            else {
                                this.beatsPerBar = base64CharCodeToInt[compressed.charCodeAt(charIndex++)] + 1;
                            }
                            this.beatsPerBar = Math.max(Config.beatsPerBarMin, Math.min(Config.beatsPerBarMax, this.beatsPerBar));
                        }
                        break;
                    case 103:
                        {
                            const barCount = (base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) + base64CharCodeToInt[compressed.charCodeAt(charIndex++)] + 1;
                            this.barCount = validateRange(Config.barCountMin, Config.barCountMax, barCount);
                            for (let channelIndex = 0; channelIndex < this.getChannelCount(); channelIndex++) {
                                for (let bar = this.channels[channelIndex].bars.length; bar < this.barCount; bar++) {
                                    this.channels[channelIndex].bars[bar] = (bar < 4) ? 1 : 0;
                                }
                                this.channels[channelIndex].bars.length = this.barCount;
                            }
                        }
                        break;
                    case 106:
                        {
                            let patternsPerChannel;
                            if (beforeEight && fromBeepBox) {
                                patternsPerChannel = base64CharCodeToInt[compressed.charCodeAt(charIndex++)] + 1;
                            }
                            else {
                                patternsPerChannel = (base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) + base64CharCodeToInt[compressed.charCodeAt(charIndex++)] + 1;
                            }
                            this.patternsPerChannel = validateRange(1, Config.barCountMax, patternsPerChannel);
                            const channelCount = this.getChannelCount();
                            for (let channelIndex = 0; channelIndex < channelCount; channelIndex++) {
                                const patterns = this.channels[channelIndex].patterns;
                                for (let pattern = patterns.length; pattern < this.patternsPerChannel; pattern++) {
                                    patterns[pattern] = new Pattern();
                                }
                                patterns.length = this.patternsPerChannel;
                            }
                        }
                        break;
                    case 105:
                        {
                            if ((beforeNine && fromBeepBox) || (beforeFive && fromJummBox)) {
                                const instrumentsPerChannel = validateRange(Config.instrumentCountMin, Config.patternInstrumentCountMax, base64CharCodeToInt[compressed.charCodeAt(charIndex++)] + Config.instrumentCountMin);
                                this.layeredInstruments = false;
                                this.patternInstruments = (instrumentsPerChannel > 1);
                                for (let channelIndex = 0; channelIndex < this.getChannelCount(); channelIndex++) {
                                    const isNoiseChannel = channelIndex >= this.pitchChannelCount && channelIndex < this.pitchChannelCount + this.noiseChannelCount;
                                    const isModChannel = channelIndex >= this.pitchChannelCount + this.noiseChannelCount;
                                    for (let instrumentIndex = this.channels[channelIndex].instruments.length; instrumentIndex < instrumentsPerChannel; instrumentIndex++) {
                                        this.channels[channelIndex].instruments[instrumentIndex] = new Instrument(isNoiseChannel, isModChannel);
                                    }
                                    this.channels[channelIndex].instruments.length = instrumentsPerChannel;
                                    if (beforeSix && fromBeepBox) {
                                        for (let instrumentIndex = 0; instrumentIndex < instrumentsPerChannel; instrumentIndex++) {
                                            this.channels[channelIndex].instruments[instrumentIndex].setTypeAndReset(isNoiseChannel ? 2 : 0, isNoiseChannel, isModChannel);
                                        }
                                    }
                                    for (let j = legacySettingsCache[channelIndex].length; j < instrumentsPerChannel; j++) {
                                        legacySettingsCache[channelIndex][j] = {};
                                    }
                                }
                            }
                            else {
                                const instrumentsFlagBits = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                this.layeredInstruments = (instrumentsFlagBits & (1 << 1)) != 0;
                                this.patternInstruments = (instrumentsFlagBits & (1 << 0)) != 0;
                                for (let channelIndex = 0; channelIndex < this.getChannelCount(); channelIndex++) {
                                    let instrumentCount = 1;
                                    if (this.layeredInstruments || this.patternInstruments) {
                                        instrumentCount = validateRange(Config.instrumentCountMin, this.getMaxInstrumentsPerChannel(), base64CharCodeToInt[compressed.charCodeAt(charIndex++)] + Config.instrumentCountMin);
                                    }
                                    const channel = this.channels[channelIndex];
                                    const isNoiseChannel = this.getChannelIsNoise(channelIndex);
                                    const isModChannel = this.getChannelIsMod(channelIndex);
                                    for (let i = channel.instruments.length; i < instrumentCount; i++) {
                                        channel.instruments[i] = new Instrument(isNoiseChannel, isModChannel);
                                    }
                                    channel.instruments.length = instrumentCount;
                                }
                            }
                        }
                        break;
                    case 114:
                        {
                            this.rhythm = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                            if (fromJummBox && beforeThree || fromBeepBox) {
                                if (this.rhythm == Config.rhythms.dictionary["÷3 (triplets)"].index || this.rhythm == Config.rhythms.dictionary["÷6"].index) {
                                    useSlowerArpSpeed = true;
                                }
                                if (this.rhythm >= Config.rhythms.dictionary["÷6"].index) {
                                    useFastTwoNoteArp = true;
                                }
                            }
                        }
                        break;
                    case 111:
                        {
                            if (beforeThree && fromBeepBox) {
                                const channelIndex = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                this.channels[channelIndex].octave = clamp(0, Config.pitchOctaves, base64CharCodeToInt[compressed.charCodeAt(charIndex++)] + 1);
                                if (channelIndex >= this.pitchChannelCount)
                                    this.channels[channelIndex].octave = 0;
                            }
                            else if ((beforeNine && fromBeepBox) || (beforeFive && fromJummBox)) {
                                for (let channelIndex = 0; channelIndex < this.getChannelCount(); channelIndex++) {
                                    this.channels[channelIndex].octave = clamp(0, Config.pitchOctaves, base64CharCodeToInt[compressed.charCodeAt(charIndex++)] + 1);
                                    if (channelIndex >= this.pitchChannelCount)
                                        this.channels[channelIndex].octave = 0;
                                }
                            }
                            else {
                                for (let channelIndex = 0; channelIndex < this.pitchChannelCount; channelIndex++) {
                                    this.channels[channelIndex].octave = clamp(0, Config.pitchOctaves, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                }
                                for (let channelIndex = this.pitchChannelCount; channelIndex < this.getChannelCount(); channelIndex++) {
                                    this.channels[channelIndex].octave = 0;
                                }
                            }
                        }
                        break;
                    case 84:
                        {
                            instrumentIndexIterator++;
                            if (instrumentIndexIterator >= this.channels[instrumentChannelIterator].instruments.length) {
                                instrumentChannelIterator++;
                                instrumentIndexIterator = 0;
                            }
                            validateRange(0, this.channels.length - 1, instrumentChannelIterator);
                            const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                            let instrumentType = validateRange(0, 10 - 1, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                            if (fromJummBox && beforeFive) {
                                if (instrumentType == 7) {
                                    instrumentType = 8;
                                }
                                else if (instrumentType == 8) {
                                    instrumentType = 9;
                                }
                            }
                            instrument.setTypeAndReset(instrumentType, instrumentChannelIterator >= this.pitchChannelCount && instrumentChannelIterator < this.pitchChannelCount + this.noiseChannelCount, instrumentChannelIterator >= this.pitchChannelCount + this.noiseChannelCount);
                            if (((beforeSeven && fromBeepBox) || (beforeTwo && fromJummBox)) && (instrumentType == 0 || instrumentType == 8 || instrumentType == 6)) {
                                instrument.aliases = true;
                                instrument.distortion = 0;
                                instrument.effects |= 1 << 3;
                            }
                            if (useSlowerArpSpeed) {
                                instrument.arpeggioSpeed = 9;
                            }
                            if (useFastTwoNoteArp) {
                                instrument.fastTwoNoteArp = true;
                            }
                            if (beforeSeven && fromBeepBox) {
                                instrument.effects = 0;
                                if (instrument.chord != Config.chords.dictionary["simultaneous"].index) {
                                    instrument.effects |= 1 << 11;
                                }
                            }
                        }
                        break;
                    case 117:
                        {
                            const presetValue = (base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) | (base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                            this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].preset = presetValue;
                            if (fromJummBox && beforeFive) {
                                if (this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].preset == 7) {
                                    this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].preset = 8;
                                }
                            }
                        }
                        break;
                    case 119:
                        {
                            if (beforeThree && fromBeepBox) {
                                const legacyWaves = [1, 2, 3, 4, 5, 6, 7, 8, 0];
                                const channelIndex = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                const instrument = this.channels[channelIndex].instruments[0];
                                instrument.chipWave = clamp(0, Config.chipWaves.length, legacyWaves[base64CharCodeToInt[compressed.charCodeAt(charIndex++)]] | 0);
                                instrument.convertLegacySettings(legacySettingsCache[channelIndex][0], forceSimpleFilter);
                            }
                            else if (beforeSix && fromBeepBox) {
                                const legacyWaves = [1, 2, 3, 4, 5, 6, 7, 8, 0];
                                for (let channelIndex = 0; channelIndex < this.getChannelCount(); channelIndex++) {
                                    for (const instrument of this.channels[channelIndex].instruments) {
                                        if (channelIndex >= this.pitchChannelCount) {
                                            instrument.chipNoise = clamp(0, Config.chipNoises.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                        }
                                        else {
                                            instrument.chipWave = clamp(0, Config.chipWaves.length, legacyWaves[base64CharCodeToInt[compressed.charCodeAt(charIndex++)]] | 0);
                                        }
                                    }
                                }
                            }
                            else if (beforeSeven && fromBeepBox) {
                                const legacyWaves = [1, 2, 3, 4, 5, 6, 7, 8, 0];
                                if (instrumentChannelIterator >= this.pitchChannelCount) {
                                    this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].chipNoise = clamp(0, Config.chipNoises.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                }
                                else {
                                    this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].chipWave = clamp(0, Config.chipWaves.length, legacyWaves[base64CharCodeToInt[compressed.charCodeAt(charIndex++)]] | 0);
                                }
                            }
                            else {
                                if (instrumentChannelIterator >= this.pitchChannelCount) {
                                    this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].chipNoise = clamp(0, Config.chipNoises.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                }
                                else {
                                    this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].chipWave = clamp(0, Config.chipWaves.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                }
                            }
                        }
                        break;
                    case 102:
                        {
                            if ((beforeNine && fromBeepBox) || (beforeFive && fromJummBox)) {
                                if (beforeSeven && fromBeepBox) {
                                    const legacyToCutoff = [10, 6, 3, 0, 8, 5, 2];
                                    const legacyToEnvelope = ["none", "none", "none", "none", "decay 1", "decay 2", "decay 3"];
                                    if (beforeThree && fromBeepBox) {
                                        const channelIndex = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                        const instrument = this.channels[channelIndex].instruments[0];
                                        const legacySettings = legacySettingsCache[channelIndex][0];
                                        const legacyFilter = [1, 3, 4, 5][clamp(0, legacyToCutoff.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)])];
                                        legacySettings.filterCutoff = legacyToCutoff[legacyFilter];
                                        legacySettings.filterResonance = 0;
                                        legacySettings.filterEnvelope = Config.envelopes.dictionary[legacyToEnvelope[legacyFilter]];
                                        instrument.convertLegacySettings(legacySettings, forceSimpleFilter);
                                    }
                                    else if (beforeSix && fromBeepBox) {
                                        for (let channelIndex = 0; channelIndex < this.getChannelCount(); channelIndex++) {
                                            for (let i = 0; i < this.channels[channelIndex].instruments.length; i++) {
                                                const instrument = this.channels[channelIndex].instruments[i];
                                                const legacySettings = legacySettingsCache[channelIndex][i];
                                                const legacyFilter = clamp(0, legacyToCutoff.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)] + 1);
                                                if (channelIndex < this.pitchChannelCount) {
                                                    legacySettings.filterCutoff = legacyToCutoff[legacyFilter];
                                                    legacySettings.filterResonance = 0;
                                                    legacySettings.filterEnvelope = Config.envelopes.dictionary[legacyToEnvelope[legacyFilter]];
                                                }
                                                else {
                                                    legacySettings.filterCutoff = 10;
                                                    legacySettings.filterResonance = 0;
                                                    legacySettings.filterEnvelope = Config.envelopes.dictionary["none"];
                                                }
                                                instrument.convertLegacySettings(legacySettings, forceSimpleFilter);
                                            }
                                        }
                                    }
                                    else {
                                        const legacyFilter = clamp(0, legacyToCutoff.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                        const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                                        const legacySettings = legacySettingsCache[instrumentChannelIterator][instrumentIndexIterator];
                                        legacySettings.filterCutoff = legacyToCutoff[legacyFilter];
                                        legacySettings.filterResonance = 0;
                                        legacySettings.filterEnvelope = Config.envelopes.dictionary[legacyToEnvelope[legacyFilter]];
                                        instrument.convertLegacySettings(legacySettings, forceSimpleFilter);
                                    }
                                }
                                else {
                                    const filterCutoffRange = 11;
                                    const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                                    const legacySettings = legacySettingsCache[instrumentChannelIterator][instrumentIndexIterator];
                                    legacySettings.filterCutoff = clamp(0, filterCutoffRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                    instrument.convertLegacySettings(legacySettings, forceSimpleFilter);
                                }
                            }
                            else {
                                const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                                let typeCheck = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                if (fromBeepBox || typeCheck == 0) {
                                    instrument.eqFilterType = false;
                                    if (fromJummBox)
                                        typeCheck = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                    const originalControlPointCount = typeCheck;
                                    instrument.eqFilter.controlPointCount = clamp(0, Config.filterMaxPoints + 1, originalControlPointCount);
                                    for (let i = instrument.eqFilter.controlPoints.length; i < instrument.eqFilter.controlPointCount; i++) {
                                        instrument.eqFilter.controlPoints[i] = new FilterControlPoint();
                                    }
                                    for (let i = 0; i < instrument.eqFilter.controlPointCount; i++) {
                                        const point = instrument.eqFilter.controlPoints[i];
                                        point.type = clamp(0, 3, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                        point.freq = clamp(0, Config.filterFreqRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                        point.gain = clamp(0, Config.filterGainRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                    }
                                    for (let i = instrument.eqFilter.controlPointCount; i < originalControlPointCount; i++) {
                                        charIndex += 3;
                                    }
                                    instrument.eqSubFilters[0] = instrument.eqFilter;
                                    if (fromJummBox && !beforeFive) {
                                        let usingSubFilterBitfield = (base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) | (base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                        for (let j = 0; j < Config.filterMorphCount - 1; j++) {
                                            if (usingSubFilterBitfield & (1 << j)) {
                                                const originalSubfilterControlPointCount = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                                if (instrument.eqSubFilters[j + 1] == null)
                                                    instrument.eqSubFilters[j + 1] = new FilterSettings();
                                                instrument.eqSubFilters[j + 1].controlPointCount = clamp(0, Config.filterMaxPoints + 1, originalSubfilterControlPointCount);
                                                for (let i = instrument.eqSubFilters[j + 1].controlPoints.length; i < instrument.eqSubFilters[j + 1].controlPointCount; i++) {
                                                    instrument.eqSubFilters[j + 1].controlPoints[i] = new FilterControlPoint();
                                                }
                                                for (let i = 0; i < instrument.eqSubFilters[j + 1].controlPointCount; i++) {
                                                    const point = instrument.eqSubFilters[j + 1].controlPoints[i];
                                                    point.type = clamp(0, 3, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                                    point.freq = clamp(0, Config.filterFreqRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                                    point.gain = clamp(0, Config.filterGainRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                                }
                                                for (let i = instrument.eqSubFilters[j + 1].controlPointCount; i < originalSubfilterControlPointCount; i++) {
                                                    charIndex += 3;
                                                }
                                            }
                                        }
                                    }
                                }
                                else {
                                    instrument.eqFilterType = true;
                                    instrument.eqFilterSimpleCut = clamp(0, Config.filterSimpleCutRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                    instrument.eqFilterSimplePeak = clamp(0, Config.filterSimplePeakRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                }
                            }
                        }
                        break;
                    case 121:
                        {
                            if ((beforeNine && fromBeepBox) || (beforeFive && fromJummBox)) {
                                const filterResonanceRange = 8;
                                const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                                const legacySettings = legacySettingsCache[instrumentChannelIterator][instrumentIndexIterator];
                                legacySettings.filterResonance = clamp(0, filterResonanceRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                instrument.convertLegacySettings(legacySettings, forceSimpleFilter);
                            }
                        }
                        break;
                    case 122:
                        {
                            const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                            if ((beforeNine && fromBeepBox) || (beforeFive && fromJummBox)) {
                                if (instrument.type == 4) {
                                    for (let i = 0; i < Config.drumCount; i++) {
                                        instrument.drumsetEnvelopes[i] = Song._envelopeFromLegacyIndex(base64CharCodeToInt[compressed.charCodeAt(charIndex++)]).index;
                                    }
                                }
                                else {
                                    const legacySettings = legacySettingsCache[instrumentChannelIterator][instrumentIndexIterator];
                                    legacySettings.filterEnvelope = Song._envelopeFromLegacyIndex(base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                    instrument.convertLegacySettings(legacySettings, forceSimpleFilter);
                                }
                            }
                            else {
                                for (let i = 0; i < Config.drumCount; i++) {
                                    instrument.drumsetEnvelopes[i] = clamp(0, Config.envelopes.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                }
                            }
                        }
                        break;
                    case 87:
                        {
                            const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                            instrument.pulseWidth = clamp(0, Config.pulseWidthRange + (+(fromJummBox)), base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                            if (fromBeepBox) {
                                instrument.pulseWidth = Math.round(Math.pow(0.5, (7 - instrument.pulseWidth) * Config.pulseWidthStepPower) * Config.pulseWidthRange);
                            }
                            if ((beforeNine && fromBeepBox) || (beforeFive && fromJummBox)) {
                                const legacySettings = legacySettingsCache[instrumentChannelIterator][instrumentIndexIterator];
                                legacySettings.pulseEnvelope = Song._envelopeFromLegacyIndex(base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                instrument.convertLegacySettings(legacySettings, forceSimpleFilter);
                            }
                        }
                        break;
                    case 73:
                        {
                            const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                            instrument.stringSustain = clamp(0, Config.stringSustainRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                        }
                        break;
                    case 89:
                        {
                            this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].invertWave = Boolean(base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                        }
                        break;
                    case 100:
                        {
                            if ((beforeNine && fromBeepBox) || (beforeFive && fromJummBox)) {
                                const legacySettings = [
                                    { transition: "interrupt", fadeInSeconds: 0.0, fadeOutTicks: -1 },
                                    { transition: "normal", fadeInSeconds: 0.0, fadeOutTicks: -3 },
                                    { transition: "normal", fadeInSeconds: 0.025, fadeOutTicks: -3 },
                                    { transition: "slide in pattern", fadeInSeconds: 0.025, fadeOutTicks: -3 },
                                    { transition: "normal", fadeInSeconds: 0.04, fadeOutTicks: 6 },
                                    { transition: "normal", fadeInSeconds: 0.0, fadeOutTicks: 48 },
                                    { transition: "normal", fadeInSeconds: 0.0125, fadeOutTicks: 72 },
                                    { transition: "normal", fadeInSeconds: 0.06, fadeOutTicks: 96 },
                                ];
                                if (beforeThree && fromBeepBox) {
                                    const channelIndex = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                    const settings = legacySettings[clamp(0, legacySettings.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)])];
                                    const instrument = this.channels[channelIndex].instruments[0];
                                    instrument.fadeIn = Synth.secondsToFadeInSetting(settings.fadeInSeconds);
                                    instrument.fadeOut = Synth.ticksToFadeOutSetting(settings.fadeOutTicks);
                                    instrument.transition = Config.transitions.dictionary[settings.transition].index;
                                    if (instrument.transition != Config.transitions.dictionary["normal"].index) {
                                        instrument.effects |= 1 << 10;
                                    }
                                }
                                else if (beforeSix && fromBeepBox) {
                                    for (let channelIndex = 0; channelIndex < this.getChannelCount(); channelIndex++) {
                                        for (const instrument of this.channels[channelIndex].instruments) {
                                            const settings = legacySettings[clamp(0, legacySettings.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)])];
                                            instrument.fadeIn = Synth.secondsToFadeInSetting(settings.fadeInSeconds);
                                            instrument.fadeOut = Synth.ticksToFadeOutSetting(settings.fadeOutTicks);
                                            instrument.transition = Config.transitions.dictionary[settings.transition].index;
                                            if (instrument.transition != Config.transitions.dictionary["normal"].index) {
                                                instrument.effects |= 1 << 10;
                                            }
                                        }
                                    }
                                }
                                else if (beforeFour || fromBeepBox) {
                                    const settings = legacySettings[clamp(0, legacySettings.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)])];
                                    const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                                    instrument.fadeIn = Synth.secondsToFadeInSetting(settings.fadeInSeconds);
                                    instrument.fadeOut = Synth.ticksToFadeOutSetting(settings.fadeOutTicks);
                                    instrument.transition = Config.transitions.dictionary[settings.transition].index;
                                    if (instrument.transition != Config.transitions.dictionary["normal"].index) {
                                        instrument.effects |= 1 << 10;
                                    }
                                }
                                else {
                                    const settings = legacySettings[clamp(0, legacySettings.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)])];
                                    const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                                    instrument.fadeIn = Synth.secondsToFadeInSetting(settings.fadeInSeconds);
                                    instrument.fadeOut = Synth.ticksToFadeOutSetting(settings.fadeOutTicks);
                                    instrument.transition = Config.transitions.dictionary[settings.transition].index;
                                    if (base64CharCodeToInt[compressed.charCodeAt(charIndex++)] > 0) {
                                        instrument.legacyTieOver = true;
                                    }
                                    instrument.clicklessTransition = base64CharCodeToInt[compressed.charCodeAt(charIndex++)] ? true : false;
                                    if (instrument.transition != Config.transitions.dictionary["normal"].index || instrument.clicklessTransition) {
                                        instrument.effects |= 1 << 10;
                                    }
                                }
                            }
                            else {
                                const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                                instrument.fadeIn = clamp(0, Config.fadeInRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                instrument.fadeOut = clamp(0, Config.fadeOutTicks.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                if (fromJummBox)
                                    instrument.clicklessTransition = base64CharCodeToInt[compressed.charCodeAt(charIndex++)] ? true : false;
                            }
                        }
                        break;
                    case 99:
                        {
                            if ((beforeNine && fromBeepBox) || (beforeFive && fromJummBox)) {
                                if (beforeSeven && fromBeepBox) {
                                    if (beforeThree && fromBeepBox) {
                                        const legacyEffects = [0, 3, 2, 0];
                                        const legacyEnvelopes = ["none", "none", "none", "tremolo2"];
                                        const channelIndex = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                        const effect = clamp(0, legacyEffects.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                        const instrument = this.channels[channelIndex].instruments[0];
                                        const legacySettings = legacySettingsCache[channelIndex][0];
                                        instrument.vibrato = legacyEffects[effect];
                                        if (legacySettings.filterEnvelope == undefined || legacySettings.filterEnvelope.type == 1) {
                                            legacySettings.filterEnvelope = Config.envelopes.dictionary[legacyEnvelopes[effect]];
                                            instrument.convertLegacySettings(legacySettings, forceSimpleFilter);
                                        }
                                        if (instrument.vibrato != Config.vibratos.dictionary["none"].index) {
                                            instrument.effects |= 1 << 9;
                                        }
                                    }
                                    else if (beforeSix && fromBeepBox) {
                                        const legacyEffects = [0, 1, 2, 3, 0, 0];
                                        const legacyEnvelopes = ["none", "none", "none", "none", "tremolo5", "tremolo2"];
                                        for (let channelIndex = 0; channelIndex < this.getChannelCount(); channelIndex++) {
                                            for (let i = 0; i < this.channels[channelIndex].instruments.length; i++) {
                                                const effect = clamp(0, legacyEffects.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                                const instrument = this.channels[channelIndex].instruments[i];
                                                const legacySettings = legacySettingsCache[channelIndex][i];
                                                instrument.vibrato = legacyEffects[effect];
                                                if (legacySettings.filterEnvelope == undefined || legacySettings.filterEnvelope.type == 1) {
                                                    legacySettings.filterEnvelope = Config.envelopes.dictionary[legacyEnvelopes[effect]];
                                                    instrument.convertLegacySettings(legacySettings, forceSimpleFilter);
                                                }
                                                if (instrument.vibrato != Config.vibratos.dictionary["none"].index) {
                                                    instrument.effects |= 1 << 9;
                                                }
                                                if ((legacyGlobalReverb != 0 || (fromJummBox && beforeFive)) && !this.getChannelIsNoise(channelIndex)) {
                                                    instrument.effects |= 1 << 0;
                                                    instrument.reverb = legacyGlobalReverb;
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        const legacyEffects = [0, 1, 2, 3, 0, 0];
                                        const legacyEnvelopes = ["none", "none", "none", "none", "tremolo5", "tremolo2"];
                                        const effect = clamp(0, legacyEffects.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                        const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                                        const legacySettings = legacySettingsCache[instrumentChannelIterator][instrumentIndexIterator];
                                        instrument.vibrato = legacyEffects[effect];
                                        if (legacySettings.filterEnvelope == undefined || legacySettings.filterEnvelope.type == 1) {
                                            legacySettings.filterEnvelope = Config.envelopes.dictionary[legacyEnvelopes[effect]];
                                            instrument.convertLegacySettings(legacySettings, forceSimpleFilter);
                                        }
                                        if (instrument.vibrato != Config.vibratos.dictionary["none"].index) {
                                            instrument.effects |= 1 << 9;
                                        }
                                        if (legacyGlobalReverb != 0 || (fromJummBox && beforeFive)) {
                                            instrument.effects |= 1 << 0;
                                            instrument.reverb = legacyGlobalReverb;
                                        }
                                    }
                                }
                                else {
                                    const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                                    const vibrato = clamp(0, Config.vibratos.length + 1, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                    instrument.vibrato = vibrato;
                                    if (instrument.vibrato != Config.vibratos.dictionary["none"].index) {
                                        instrument.effects |= 1 << 9;
                                    }
                                    if (vibrato == Config.vibratos.length) {
                                        instrument.vibratoDepth = clamp(0, Config.modulators.dictionary["vibrato depth"].maxRawVol + 1, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]) / 50;
                                        instrument.vibratoSpeed = clamp(0, Config.modulators.dictionary["vibrato speed"].maxRawVol + 1, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                        instrument.vibratoDelay = clamp(0, Config.modulators.dictionary["vibrato delay"].maxRawVol + 1, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]) / 2;
                                        instrument.vibratoType = clamp(0, Config.vibratoTypes.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                        instrument.effects |= 1 << 9;
                                    }
                                    else {
                                        instrument.vibratoDepth = Config.vibratos[instrument.vibrato].amplitude;
                                        instrument.vibratoSpeed = 10;
                                        instrument.vibratoDelay = Config.vibratos[instrument.vibrato].delayTicks / 2;
                                        instrument.vibratoType = Config.vibratos[instrument.vibrato].type;
                                    }
                                }
                            }
                        }
                        break;
                    case 71:
                        {
                            if (fromJummBox && beforeFive) {
                                const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                                instrument.arpeggioSpeed = clamp(0, Config.modulators.dictionary["arp speed"].maxRawVol + 1, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                instrument.fastTwoNoteArp = base64CharCodeToInt[compressed.charCodeAt(charIndex++)] ? true : false;
                            }
                        }
                        break;
                    case 104:
                        {
                            if (beforeThree && fromBeepBox) {
                                const channelIndex = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                this.channels[channelIndex].instruments[0].unison = clamp(0, Config.unisons.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                            }
                            else if (beforeSix && fromBeepBox) {
                                for (let channelIndex = 0; channelIndex < this.getChannelCount(); channelIndex++) {
                                    for (const instrument of this.channels[channelIndex].instruments) {
                                        const originalValue = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                        let unison = clamp(0, Config.unisons.length, originalValue);
                                        if (originalValue == 8) {
                                            unison = 2;
                                            instrument.chord = 3;
                                        }
                                        instrument.unison = unison;
                                    }
                                }
                            }
                            else if (beforeSeven && fromBeepBox) {
                                const originalValue = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                let unison = clamp(0, Config.unisons.length, originalValue);
                                if (originalValue == 8) {
                                    unison = 2;
                                    this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].chord = 3;
                                }
                                this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].unison = unison;
                            }
                            else {
                                this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].unison = clamp(0, Config.unisons.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                            }
                        }
                        break;
                    case 67:
                        {
                            if ((beforeNine && fromBeepBox) || (beforeFive && fromJummBox)) {
                                const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                                instrument.chord = clamp(0, Config.chords.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                if (instrument.chord != Config.chords.dictionary["simultaneous"].index) {
                                    instrument.effects |= 1 << 11;
                                }
                            }
                        }
                        break;
                    case 113:
                        {
                            const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                            if ((beforeNine && fromBeepBox) || (beforeFive && fromJummBox)) {
                                instrument.effects = (base64CharCodeToInt[compressed.charCodeAt(charIndex++)] & ((1 << 12) - 1));
                                if (legacyGlobalReverb == 0 && !(fromJummBox && beforeFive)) {
                                    instrument.effects &= ~(1 << 0);
                                }
                                else if (effectsIncludeReverb(instrument.effects)) {
                                    instrument.reverb = legacyGlobalReverb;
                                }
                                instrument.effects |= 1 << 2;
                                if (instrument.vibrato != Config.vibratos.dictionary["none"].index) {
                                    instrument.effects |= 1 << 9;
                                }
                                if (instrument.detune != Config.detuneCenter) {
                                    instrument.effects |= 1 << 8;
                                }
                                if (instrument.aliases)
                                    instrument.effects |= 1 << 3;
                                else
                                    instrument.effects &= ~(1 << 3);
                                const legacySettings = legacySettingsCache[instrumentChannelIterator][instrumentIndexIterator];
                                instrument.convertLegacySettings(legacySettings, forceSimpleFilter);
                            }
                            else {
                                instrument.effects = (base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) | (base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                if (effectsIncludeNoteFilter(instrument.effects)) {
                                    let typeCheck = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                    if (fromBeepBox || typeCheck == 0) {
                                        instrument.noteFilterType = false;
                                        if (fromJummBox)
                                            typeCheck = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                        instrument.noteFilter.controlPointCount = clamp(0, Config.filterMaxPoints + 1, typeCheck);
                                        for (let i = instrument.noteFilter.controlPoints.length; i < instrument.noteFilter.controlPointCount; i++) {
                                            instrument.noteFilter.controlPoints[i] = new FilterControlPoint();
                                        }
                                        for (let i = 0; i < instrument.noteFilter.controlPointCount; i++) {
                                            const point = instrument.noteFilter.controlPoints[i];
                                            point.type = clamp(0, 3, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                            point.freq = clamp(0, Config.filterFreqRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                            point.gain = clamp(0, Config.filterGainRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                        }
                                        for (let i = instrument.noteFilter.controlPointCount; i < typeCheck; i++) {
                                            charIndex += 3;
                                        }
                                        instrument.noteSubFilters[0] = instrument.noteFilter;
                                        if (fromJummBox && !beforeFive) {
                                            let usingSubFilterBitfield = (base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) | (base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                            for (let j = 0; j < Config.filterMorphCount - 1; j++) {
                                                if (usingSubFilterBitfield & (1 << j)) {
                                                    const originalSubfilterControlPointCount = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                                    if (instrument.noteSubFilters[j + 1] == null)
                                                        instrument.noteSubFilters[j + 1] = new FilterSettings();
                                                    instrument.noteSubFilters[j + 1].controlPointCount = clamp(0, Config.filterMaxPoints + 1, originalSubfilterControlPointCount);
                                                    for (let i = instrument.noteSubFilters[j + 1].controlPoints.length; i < instrument.noteSubFilters[j + 1].controlPointCount; i++) {
                                                        instrument.noteSubFilters[j + 1].controlPoints[i] = new FilterControlPoint();
                                                    }
                                                    for (let i = 0; i < instrument.noteSubFilters[j + 1].controlPointCount; i++) {
                                                        const point = instrument.noteSubFilters[j + 1].controlPoints[i];
                                                        point.type = clamp(0, 3, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                                        point.freq = clamp(0, Config.filterFreqRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                                        point.gain = clamp(0, Config.filterGainRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                                    }
                                                    for (let i = instrument.noteSubFilters[j + 1].controlPointCount; i < originalSubfilterControlPointCount; i++) {
                                                        charIndex += 3;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        instrument.noteFilterType = true;
                                        instrument.noteFilter.reset();
                                        instrument.noteFilterSimpleCut = clamp(0, Config.filterSimpleCutRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                        instrument.noteFilterSimplePeak = clamp(0, Config.filterSimplePeakRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                    }
                                }
                                if (effectsIncludeTransition(instrument.effects)) {
                                    instrument.transition = clamp(0, Config.transitions.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                }
                                if (effectsIncludeChord(instrument.effects)) {
                                    instrument.chord = clamp(0, Config.chords.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                    if (instrument.chord == Config.chords.dictionary["arpeggio"].index && fromJummBox) {
                                        instrument.arpeggioSpeed = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                        instrument.fastTwoNoteArp = (base64CharCodeToInt[compressed.charCodeAt(charIndex++)]) ? true : false;
                                    }
                                }
                                if (effectsIncludePitchShift(instrument.effects)) {
                                    instrument.pitchShift = clamp(0, Config.pitchShiftRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                }
                                if (effectsIncludeDetune(instrument.effects)) {
                                    if (fromBeepBox) {
                                        instrument.detune = clamp(Config.detuneMin, Config.detuneMax + 1, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                        instrument.detune = Math.round((instrument.detune - 9) * (Math.abs(instrument.detune - 9) + 1) / 2 + Config.detuneCenter);
                                    }
                                    else {
                                        instrument.detune = clamp(Config.detuneMin, Config.detuneMax + 1, (base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) + base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                    }
                                }
                                if (effectsIncludeVibrato(instrument.effects)) {
                                    instrument.vibrato = clamp(0, Config.vibratos.length + 1, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                    if (instrument.vibrato == Config.vibratos.length && fromJummBox) {
                                        instrument.vibratoDepth = clamp(0, Config.modulators.dictionary["vibrato depth"].maxRawVol + 1, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]) / 25;
                                        instrument.vibratoSpeed = clamp(0, Config.modulators.dictionary["vibrato speed"].maxRawVol + 1, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                        instrument.vibratoDelay = clamp(0, Config.modulators.dictionary["vibrato delay"].maxRawVol + 1, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                        instrument.vibratoType = clamp(0, Config.vibratoTypes.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                    }
                                    else {
                                        instrument.vibratoDepth = Config.vibratos[instrument.vibrato].amplitude;
                                        instrument.vibratoSpeed = 10;
                                        instrument.vibratoDelay = Config.vibratos[instrument.vibrato].delayTicks / 2;
                                        instrument.vibratoType = Config.vibratos[instrument.vibrato].type;
                                    }
                                }
                                if (effectsIncludeDistortion(instrument.effects)) {
                                    instrument.distortion = clamp(0, Config.distortionRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                    if (fromJummBox && !beforeFive)
                                        instrument.aliases = base64CharCodeToInt[compressed.charCodeAt(charIndex++)] ? true : false;
                                }
                                if (effectsIncludeBitcrusher(instrument.effects)) {
                                    instrument.bitcrusherFreq = clamp(0, Config.bitcrusherFreqRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                    instrument.bitcrusherQuantization = clamp(0, Config.bitcrusherQuantizationRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                }
                                if (effectsIncludePanning(instrument.effects)) {
                                    if (fromBeepBox) {
                                        instrument.pan = clamp(0, Config.panMax + 1, Math.round(base64CharCodeToInt[compressed.charCodeAt(charIndex++)] * ((Config.panMax) / 8.0)));
                                    }
                                    else {
                                        instrument.pan = clamp(0, Config.panMax + 1, (base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) + base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                    }
                                    if (fromJummBox && !beforeTwo)
                                        instrument.panDelay = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                }
                                if (effectsIncludeChorus(instrument.effects)) {
                                    if (fromBeepBox) {
                                        instrument.chorus = clamp(0, (Config.chorusRange / 2) + 1, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]) * 2;
                                    }
                                    else {
                                        instrument.chorus = clamp(0, Config.chorusRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                    }
                                }
                                if (effectsIncludeEcho(instrument.effects)) {
                                    instrument.echoSustain = clamp(0, Config.echoSustainRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                    instrument.echoDelay = clamp(0, Config.echoDelayRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                }
                                if (effectsIncludeReverb(instrument.effects)) {
                                    if (fromBeepBox) {
                                        instrument.reverb = clamp(0, Config.reverbRange, Math.round(base64CharCodeToInt[compressed.charCodeAt(charIndex++)] * Config.reverbRange / 3.0));
                                    }
                                    else {
                                        instrument.reverb = clamp(0, Config.reverbRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                    }
                                }
                            }
                            instrument.effects &= (1 << 12) - 1;
                        }
                        break;
                    case 118:
                        {
                            if (beforeThree && fromBeepBox) {
                                const channelIndex = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                const instrument = this.channels[channelIndex].instruments[0];
                                instrument.volume = Math.round(clamp(-Config.volumeRange / 2, 1, -base64CharCodeToInt[compressed.charCodeAt(charIndex++)] * 5.0));
                            }
                            else if (beforeSix && fromBeepBox) {
                                for (let channelIndex = 0; channelIndex < this.getChannelCount(); channelIndex++) {
                                    for (const instrument of this.channels[channelIndex].instruments) {
                                        instrument.volume = Math.round(clamp(-Config.volumeRange / 2, 1, -base64CharCodeToInt[compressed.charCodeAt(charIndex++)] * 5.0));
                                    }
                                }
                            }
                            else if (beforeSeven && fromBeepBox) {
                                const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                                instrument.volume = Math.round(clamp(-Config.volumeRange / 2, 1, -base64CharCodeToInt[compressed.charCodeAt(charIndex++)] * 5.0));
                            }
                            else if (fromBeepBox) {
                                const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                                instrument.volume = Math.round(clamp(-Config.volumeRange / 2, 1, -base64CharCodeToInt[compressed.charCodeAt(charIndex++)] * 25.0 / 7.0));
                            }
                            else {
                                const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                                instrument.volume = Math.round(clamp(-Config.volumeRange / 2, Config.volumeRange / 2 + 1, ((base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) | (base64CharCodeToInt[compressed.charCodeAt(charIndex++)])) - Config.volumeRange / 2));
                            }
                        }
                        break;
                    case 76:
                        {
                            if (beforeNine && fromBeepBox) {
                                const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                                instrument.pan = clamp(0, Config.panMax + 1, base64CharCodeToInt[compressed.charCodeAt(charIndex++)] * ((Config.panMax) / 8.0));
                            }
                            else if (beforeFive && fromJummBox) {
                                const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                                instrument.pan = clamp(0, Config.panMax + 1, (base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) + base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                if (fromJummBox && !beforeThree) {
                                    instrument.panDelay = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                }
                            }
                            else ;
                        }
                        break;
                    case 68:
                        {
                            const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                            if (fromJummBox && beforeFive) {
                                instrument.detune = clamp(Config.detuneMin, Config.detuneMax + 1, ((base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) + base64CharCodeToInt[compressed.charCodeAt(charIndex++)]) * 4);
                                instrument.effects |= 1 << 8;
                            }
                        }
                        break;
                    case 77:
                        {
                            let instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                            for (let j = 0; j < 64; j++) {
                                instrument.customChipWave[j]
                                    = clamp(-24, 25, base64CharCodeToInt[compressed.charCodeAt(charIndex++)] - 24);
                            }
                            let sum = 0.0;
                            for (let i = 0; i < instrument.customChipWave.length; i++) {
                                sum += instrument.customChipWave[i];
                            }
                            const average = sum / instrument.customChipWave.length;
                            let cumulative = 0;
                            let wavePrev = 0;
                            for (let i = 0; i < instrument.customChipWave.length; i++) {
                                cumulative += wavePrev;
                                wavePrev = instrument.customChipWave[i] - average;
                                instrument.customChipWaveIntegral[i] = cumulative;
                            }
                            instrument.customChipWaveIntegral[64] = 0.0;
                        }
                        break;
                    case 79:
                        {
                            let nextValue = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                            if (nextValue == 0x3f) {
                                this.restoreLimiterDefaults();
                            }
                            else {
                                this.compressionRatio = (nextValue < 10 ? nextValue / 10 : (1 + (nextValue - 10) / 60));
                                nextValue = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                this.limitRatio = (nextValue < 10 ? nextValue / 10 : (nextValue - 9));
                                this.limitDecay = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                this.limitRise = (base64CharCodeToInt[compressed.charCodeAt(charIndex++)] * 250.0) + 2000.0;
                                this.compressionThreshold = base64CharCodeToInt[compressed.charCodeAt(charIndex++)] / 20.0;
                                this.limitThreshold = base64CharCodeToInt[compressed.charCodeAt(charIndex++)] / 20.0;
                                this.masterGain = ((base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) + base64CharCodeToInt[compressed.charCodeAt(charIndex++)]) / 50.0;
                            }
                        }
                        break;
                    case 85:
                        {
                            for (let channel = 0; channel < this.getChannelCount(); channel++) {
                                var channelNameLength;
                                if (beforeFour)
                                    channelNameLength = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                else
                                    channelNameLength = ((base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) + base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                this.channels[channel].name = decodeURIComponent(compressed.substring(charIndex, charIndex + channelNameLength));
                                charIndex += channelNameLength;
                            }
                        }
                        break;
                    case 65:
                        {
                            const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                            instrument.algorithm = clamp(0, Config.algorithms.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                            if ((beforeNine && fromBeepBox) || (beforeFive && fromJummBox)) {
                                const legacySettings = legacySettingsCache[instrumentChannelIterator][instrumentIndexIterator];
                                instrument.convertLegacySettings(legacySettings, forceSimpleFilter);
                            }
                        }
                        break;
                    case 70:
                        {
                            this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].feedbackType = clamp(0, Config.feedbacks.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                        }
                        break;
                    case 66:
                        {
                            this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].feedbackAmplitude = clamp(0, Config.operatorAmplitudeMax + 1, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                        }
                        break;
                    case 86:
                        {
                            if ((beforeNine && fromBeepBox) || (beforeFive && fromJummBox)) {
                                const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                                const legacySettings = legacySettingsCache[instrumentChannelIterator][instrumentIndexIterator];
                                legacySettings.feedbackEnvelope = Song._envelopeFromLegacyIndex(base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                instrument.convertLegacySettings(legacySettings, forceSimpleFilter);
                            }
                        }
                        break;
                    case 81:
                        {
                            for (let o = 0; o < Config.operatorCount; o++) {
                                this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].operators[o].frequency = clamp(0, Config.operatorFrequencies.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                            }
                        }
                        break;
                    case 80:
                        {
                            for (let o = 0; o < Config.operatorCount; o++) {
                                this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].operators[o].amplitude = clamp(0, Config.operatorAmplitudeMax + 1, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                            }
                        }
                        break;
                    case 69:
                        {
                            const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                            if ((beforeNine && fromBeepBox) || (beforeFive && fromJummBox)) {
                                const legacySettings = legacySettingsCache[instrumentChannelIterator][instrumentIndexIterator];
                                legacySettings.operatorEnvelopes = [];
                                for (let o = 0; o < Config.operatorCount; o++) {
                                    legacySettings.operatorEnvelopes[o] = Song._envelopeFromLegacyIndex(base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                }
                                instrument.convertLegacySettings(legacySettings, forceSimpleFilter);
                            }
                            else {
                                const envelopeCount = clamp(0, Config.maxEnvelopeCount + 1, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                for (let i = 0; i < envelopeCount; i++) {
                                    const target = clamp(0, Config.instrumentAutomationTargets.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                    let index = 0;
                                    const maxCount = Config.instrumentAutomationTargets[target].maxCount;
                                    if (maxCount > 1) {
                                        index = clamp(0, maxCount, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                    }
                                    const envelope = clamp(0, Config.envelopes.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                    instrument.addEnvelope(target, index, envelope);
                                }
                            }
                        }
                        break;
                    case 82:
                        {
                            const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                            for (let o = 0; o < Config.operatorCount; o++) {
                                instrument.operators[o].waveform = clamp(0, Config.operatorWaves.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                if (instrument.operators[o].waveform == 3) {
                                    instrument.operators[o].pulseWidth = clamp(0, Config.pwmOperatorWaves.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                }
                            }
                        }
                        break;
                    case 83:
                        {
                            const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                            if (instrument.type == 3) {
                                const byteCount = Math.ceil(Config.spectrumControlPoints * Config.spectrumControlPointBits / 6);
                                const bits = new BitFieldReader(compressed, charIndex, charIndex + byteCount);
                                for (let i = 0; i < Config.spectrumControlPoints; i++) {
                                    instrument.spectrumWave.spectrum[i] = bits.read(Config.spectrumControlPointBits);
                                }
                                instrument.spectrumWave.markCustomWaveDirty();
                                charIndex += byteCount;
                            }
                            else if (instrument.type == 4) {
                                const byteCount = Math.ceil(Config.drumCount * Config.spectrumControlPoints * Config.spectrumControlPointBits / 6);
                                const bits = new BitFieldReader(compressed, charIndex, charIndex + byteCount);
                                for (let j = 0; j < Config.drumCount; j++) {
                                    for (let i = 0; i < Config.spectrumControlPoints; i++) {
                                        instrument.drumsetSpectrumWaves[j].spectrum[i] = bits.read(Config.spectrumControlPointBits);
                                    }
                                    instrument.drumsetSpectrumWaves[j].markCustomWaveDirty();
                                }
                                charIndex += byteCount;
                            }
                            else {
                                throw new Error("Unhandled instrument type for spectrum song tag code.");
                            }
                        }
                        break;
                    case 72:
                        {
                            const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                            const byteCount = Math.ceil(Config.harmonicsControlPoints * Config.harmonicsControlPointBits / 6);
                            const bits = new BitFieldReader(compressed, charIndex, charIndex + byteCount);
                            for (let i = 0; i < Config.harmonicsControlPoints; i++) {
                                instrument.harmonicsWave.harmonics[i] = bits.read(Config.harmonicsControlPointBits);
                            }
                            instrument.harmonicsWave.markCustomWaveDirty();
                            charIndex += byteCount;
                        }
                        break;
                    case 88:
                        {
                            if (fromJummBox && beforeFive) {
                                const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                                instrument.aliases = (base64CharCodeToInt[compressed.charCodeAt(charIndex++)]) ? true : false;
                                if (instrument.aliases) {
                                    instrument.distortion = 0;
                                    instrument.effects |= 1 << 3;
                                }
                            }
                        }
                        break;
                    case 98:
                        {
                            let subStringLength;
                            if (beforeThree && fromBeepBox) {
                                const channelIndex = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                const barCount = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                subStringLength = Math.ceil(barCount * 0.5);
                                const bits = new BitFieldReader(compressed, charIndex, charIndex + subStringLength);
                                for (let i = 0; i < barCount; i++) {
                                    this.channels[channelIndex].bars[i] = bits.read(3) + 1;
                                }
                            }
                            else if (beforeFive && fromBeepBox) {
                                let neededBits = 0;
                                while ((1 << neededBits) < this.patternsPerChannel)
                                    neededBits++;
                                subStringLength = Math.ceil(this.getChannelCount() * this.barCount * neededBits / 6);
                                const bits = new BitFieldReader(compressed, charIndex, charIndex + subStringLength);
                                for (let channelIndex = 0; channelIndex < this.getChannelCount(); channelIndex++) {
                                    for (let i = 0; i < this.barCount; i++) {
                                        this.channels[channelIndex].bars[i] = bits.read(neededBits) + 1;
                                    }
                                }
                            }
                            else {
                                let neededBits = 0;
                                while ((1 << neededBits) < this.patternsPerChannel + 1)
                                    neededBits++;
                                subStringLength = Math.ceil(this.getChannelCount() * this.barCount * neededBits / 6);
                                const bits = new BitFieldReader(compressed, charIndex, charIndex + subStringLength);
                                for (let channelIndex = 0; channelIndex < this.getChannelCount(); channelIndex++) {
                                    for (let i = 0; i < this.barCount; i++) {
                                        this.channels[channelIndex].bars[i] = bits.read(neededBits);
                                    }
                                }
                            }
                            charIndex += subStringLength;
                        }
                        break;
                    case 112:
                        {
                            let bitStringLength = 0;
                            let channelIndex;
                            let largerChords = !((beforeFour && fromJummBox) || fromBeepBox);
                            let recentPitchBitLength = (largerChords ? 4 : 3);
                            let recentPitchLength = (largerChords ? 16 : 8);
                            if (beforeThree && fromBeepBox) {
                                channelIndex = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                charIndex++;
                                bitStringLength = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                bitStringLength = bitStringLength << 6;
                                bitStringLength += base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                            }
                            else {
                                channelIndex = 0;
                                let bitStringLengthLength = validateRange(1, 4, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                while (bitStringLengthLength > 0) {
                                    bitStringLength = bitStringLength << 6;
                                    bitStringLength += base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                    bitStringLengthLength--;
                                }
                            }
                            const bits = new BitFieldReader(compressed, charIndex, charIndex + bitStringLength);
                            charIndex += bitStringLength;
                            const bitsPerNoteSize = Song.getNeededBits(Config.noteSizeMax);
                            let songReverbChannel = -1;
                            let songReverbInstrument = -1;
                            let songReverbIndex = -1;
                            while (true) {
                                const channel = this.channels[channelIndex];
                                const isNoiseChannel = this.getChannelIsNoise(channelIndex);
                                const isModChannel = this.getChannelIsMod(channelIndex);
                                const maxInstrumentsPerPattern = this.getMaxInstrumentsPerPattern(channelIndex);
                                const neededInstrumentCountBits = Song.getNeededBits(maxInstrumentsPerPattern - Config.instrumentCountMin);
                                const neededInstrumentIndexBits = Song.getNeededBits(channel.instruments.length - 1);
                                if (isModChannel) {
                                    const neededModInstrumentIndexBits = (beforeFive) ? neededInstrumentIndexBits : Song.getNeededBits(this.getMaxInstrumentsPerChannel() + 2);
                                    for (let instrumentIndex = 0; instrumentIndex < channel.instruments.length; instrumentIndex++) {
                                        let instrument = channel.instruments[instrumentIndex];
                                        for (let mod = 0; mod < Config.modCount; mod++) {
                                            let status = bits.read(2);
                                            switch (status) {
                                                case 0:
                                                    instrument.modChannels[mod] = clamp(0, this.pitchChannelCount + this.noiseChannelCount + 1, bits.read(8));
                                                    instrument.modInstruments[mod] = clamp(0, this.channels[instrument.modChannels[mod]].instruments.length + 2, bits.read(neededModInstrumentIndexBits));
                                                    break;
                                                case 1:
                                                    instrument.modChannels[mod] = this.pitchChannelCount + clamp(0, this.noiseChannelCount + 1, bits.read(8));
                                                    instrument.modInstruments[mod] = clamp(0, this.channels[instrument.modChannels[mod]].instruments.length + 2, bits.read(neededInstrumentIndexBits));
                                                    break;
                                                case 2:
                                                    instrument.modChannels[mod] = -1;
                                                    break;
                                                case 3:
                                                    instrument.modChannels[mod] = -2;
                                                    break;
                                            }
                                            if (status != 3) {
                                                instrument.modulators[mod] = bits.read(6);
                                            }
                                            if (!beforeFive && (Config.modulators[instrument.modulators[mod]].name == "eq filter" || Config.modulators[instrument.modulators[mod]].name == "note filter")) {
                                                instrument.modFilterTypes[mod] = bits.read(6);
                                            }
                                            if (beforeFive && instrument.modChannels[mod] >= 0) {
                                                let forNoteFilter = effectsIncludeNoteFilter(this.channels[instrument.modChannels[mod]].instruments[instrument.modInstruments[mod]].effects);
                                                if (instrument.modulators[mod] == 7) {
                                                    if (forNoteFilter) {
                                                        instrument.modulators[mod] = Config.modulators.dictionary["note filt cut"].index;
                                                    }
                                                    else {
                                                        instrument.modulators[mod] = Config.modulators.dictionary["eq filt cut"].index;
                                                    }
                                                    instrument.modFilterTypes[mod] = 1;
                                                }
                                                else if (instrument.modulators[mod] == 8) {
                                                    if (forNoteFilter) {
                                                        instrument.modulators[mod] = Config.modulators.dictionary["note filt peak"].index;
                                                    }
                                                    else {
                                                        instrument.modulators[mod] = Config.modulators.dictionary["eq filt peak"].index;
                                                    }
                                                    instrument.modFilterTypes[mod] = 2;
                                                }
                                            }
                                            else if (beforeFive) {
                                                if (instrument.modulators[mod] == Config.modulators.dictionary["song reverb"].index) {
                                                    songReverbChannel = channelIndex;
                                                    songReverbInstrument = instrumentIndex;
                                                    songReverbIndex = mod;
                                                }
                                            }
                                            if (beforeFive && Config.modulators[instrument.modulators[mod]].associatedEffect != 12) {
                                                this.channels[instrument.modChannels[mod]].instruments[instrument.modInstruments[mod]].effects |= 1 << Config.modulators[instrument.modulators[mod]].associatedEffect;
                                            }
                                        }
                                    }
                                }
                                const detuneScaleNotes = [];
                                for (let j = 0; j < channel.instruments.length; j++) {
                                    detuneScaleNotes[j] = [];
                                    for (let i = 0; i < Config.modCount; i++) {
                                        detuneScaleNotes[j][Config.modCount - 1 - i] = 1 + 3 * +(beforeFive && fromJummBox && isModChannel && (channel.instruments[j].modulators[i] == Config.modulators.dictionary["detune"].index));
                                    }
                                }
                                const octaveOffset = (isNoiseChannel || isModChannel) ? 0 : channel.octave * 12;
                                let lastPitch = ((isNoiseChannel || isModChannel) ? 4 : octaveOffset);
                                const recentPitches = isModChannel ? [0, 1, 2, 3, 4, 5] : (isNoiseChannel ? [4, 6, 7, 2, 3, 8, 0, 10] : [0, 7, 12, 19, 24, -5, -12]);
                                const recentShapes = [];
                                for (let i = 0; i < recentPitches.length; i++) {
                                    recentPitches[i] += octaveOffset;
                                }
                                for (let i = 0; i < this.patternsPerChannel; i++) {
                                    const newPattern = channel.patterns[i];
                                    if ((beforeNine && fromBeepBox) || (beforeFive && fromJummBox)) {
                                        newPattern.instruments[0] = validateRange(0, channel.instruments.length - 1, bits.read(neededInstrumentIndexBits));
                                        newPattern.instruments.length = 1;
                                    }
                                    else {
                                        if (this.patternInstruments) {
                                            const instrumentCount = validateRange(Config.instrumentCountMin, maxInstrumentsPerPattern, bits.read(neededInstrumentCountBits) + Config.instrumentCountMin);
                                            for (let j = 0; j < instrumentCount; j++) {
                                                newPattern.instruments[j] = validateRange(0, channel.instruments.length - 1 + +(isModChannel) * 2, bits.read(neededInstrumentIndexBits));
                                            }
                                            newPattern.instruments.length = instrumentCount;
                                        }
                                        else {
                                            newPattern.instruments[0] = 0;
                                            newPattern.instruments.length = Config.instrumentCountMin;
                                        }
                                    }
                                    if (!(fromBeepBox && beforeThree) && bits.read(1) == 0) {
                                        newPattern.notes.length = 0;
                                        continue;
                                    }
                                    let curPart = 0;
                                    const newNotes = newPattern.notes;
                                    let noteCount = 0;
                                    while (curPart < this.beatsPerBar * Config.partsPerBeat + (+isModChannel)) {
                                        const useOldShape = bits.read(1) == 1;
                                        let newNote = false;
                                        let shapeIndex = 0;
                                        if (useOldShape) {
                                            shapeIndex = validateRange(0, recentShapes.length - 1, bits.readLongTail(0, 0));
                                        }
                                        else {
                                            newNote = bits.read(1) == 1;
                                        }
                                        if (!useOldShape && !newNote) {
                                            if (isModChannel) {
                                                const isBackwards = bits.read(1) == 1;
                                                const restLength = bits.readPartDuration();
                                                if (isBackwards) {
                                                    curPart -= restLength;
                                                }
                                                else {
                                                    curPart += restLength;
                                                }
                                            }
                                            else {
                                                const restLength = (beforeSeven && fromBeepBox)
                                                    ? bits.readLegacyPartDuration() * Config.partsPerBeat / Config.rhythms[this.rhythm].stepsPerBeat
                                                    : bits.readPartDuration();
                                                curPart += restLength;
                                            }
                                        }
                                        else {
                                            let shape;
                                            if (useOldShape) {
                                                shape = recentShapes[shapeIndex];
                                                recentShapes.splice(shapeIndex, 1);
                                            }
                                            else {
                                                shape = {};
                                                if (!largerChords) {
                                                    shape.pitchCount = 1;
                                                    while (shape.pitchCount < 4 && bits.read(1) == 1)
                                                        shape.pitchCount++;
                                                }
                                                else {
                                                    if (bits.read(1) == 1) {
                                                        shape.pitchCount = bits.read(3) + 2;
                                                    }
                                                    else {
                                                        shape.pitchCount = 1;
                                                    }
                                                }
                                                shape.pinCount = bits.readPinCount();
                                                if (fromBeepBox) {
                                                    shape.initialSize = bits.read(2) * 2;
                                                }
                                                else if (!isModChannel) {
                                                    shape.initialSize = bits.read(bitsPerNoteSize);
                                                }
                                                else {
                                                    shape.initialSize = bits.read(9);
                                                }
                                                shape.pins = [];
                                                shape.length = 0;
                                                shape.bendCount = 0;
                                                for (let j = 0; j < shape.pinCount; j++) {
                                                    let pinObj = {};
                                                    pinObj.pitchBend = bits.read(1) == 1;
                                                    if (pinObj.pitchBend)
                                                        shape.bendCount++;
                                                    shape.length += (beforeSeven && fromBeepBox)
                                                        ? bits.readLegacyPartDuration() * Config.partsPerBeat / Config.rhythms[this.rhythm].stepsPerBeat
                                                        : bits.readPartDuration();
                                                    pinObj.time = shape.length;
                                                    if (fromBeepBox) {
                                                        pinObj.size = bits.read(2) * 2;
                                                    }
                                                    else if (!isModChannel) {
                                                        pinObj.size = bits.read(bitsPerNoteSize);
                                                    }
                                                    else {
                                                        pinObj.size = bits.read(9);
                                                    }
                                                    shape.pins.push(pinObj);
                                                }
                                            }
                                            recentShapes.unshift(shape);
                                            if (recentShapes.length > 10)
                                                recentShapes.pop();
                                            let note;
                                            if (newNotes.length <= noteCount) {
                                                note = new Note(0, curPart, curPart + shape.length, shape.initialSize);
                                                newNotes[noteCount++] = note;
                                            }
                                            else {
                                                note = newNotes[noteCount++];
                                                note.start = curPart;
                                                note.end = curPart + shape.length;
                                                note.pins[0].size = shape.initialSize;
                                            }
                                            let pitch;
                                            let pitchCount = 0;
                                            const pitchBends = [];
                                            for (let j = 0; j < shape.pitchCount + shape.bendCount; j++) {
                                                const useOldPitch = bits.read(1) == 1;
                                                if (!useOldPitch) {
                                                    const interval = bits.readPitchInterval();
                                                    pitch = lastPitch;
                                                    let intervalIter = interval;
                                                    while (intervalIter > 0) {
                                                        pitch++;
                                                        while (recentPitches.indexOf(pitch) != -1)
                                                            pitch++;
                                                        intervalIter--;
                                                    }
                                                    while (intervalIter < 0) {
                                                        pitch--;
                                                        while (recentPitches.indexOf(pitch) != -1)
                                                            pitch--;
                                                        intervalIter++;
                                                    }
                                                }
                                                else {
                                                    const pitchIndex = validateRange(0, recentPitches.length - 1, bits.read(recentPitchBitLength));
                                                    pitch = recentPitches[pitchIndex];
                                                    recentPitches.splice(pitchIndex, 1);
                                                }
                                                recentPitches.unshift(pitch);
                                                if (recentPitches.length > recentPitchLength)
                                                    recentPitches.pop();
                                                if (j < shape.pitchCount) {
                                                    note.pitches[pitchCount++] = pitch;
                                                }
                                                else {
                                                    pitchBends.push(pitch);
                                                }
                                                if (j == shape.pitchCount - 1) {
                                                    lastPitch = note.pitches[0];
                                                }
                                                else {
                                                    lastPitch = pitch;
                                                }
                                            }
                                            note.pitches.length = pitchCount;
                                            pitchBends.unshift(note.pitches[0]);
                                            if (isModChannel) {
                                                note.pins[0].size *= detuneScaleNotes[newPattern.instruments[0]][note.pitches[0]];
                                            }
                                            let pinCount = 1;
                                            for (const pinObj of shape.pins) {
                                                if (pinObj.pitchBend)
                                                    pitchBends.shift();
                                                const interval = pitchBends[0] - note.pitches[0];
                                                if (note.pins.length <= pinCount) {
                                                    if (isModChannel) {
                                                        note.pins[pinCount++] = makeNotePin(interval, pinObj.time, pinObj.size * detuneScaleNotes[newPattern.instruments[0]][note.pitches[0]]);
                                                    }
                                                    else {
                                                        note.pins[pinCount++] = makeNotePin(interval, pinObj.time, pinObj.size);
                                                    }
                                                }
                                                else {
                                                    const pin = note.pins[pinCount++];
                                                    pin.interval = interval;
                                                    pin.time = pinObj.time;
                                                    if (isModChannel) {
                                                        pin.size = pinObj.size * detuneScaleNotes[newPattern.instruments[0]][note.pitches[0]];
                                                    }
                                                    else {
                                                        pin.size = pinObj.size;
                                                    }
                                                }
                                            }
                                            note.pins.length = pinCount;
                                            if (note.start == 0) {
                                                if (!((beforeNine && fromBeepBox) || (beforeFive && fromJummBox))) {
                                                    note.continuesLastPattern = (bits.read(1) == 1);
                                                }
                                                else {
                                                    if (beforeFour || fromBeepBox) {
                                                        note.continuesLastPattern = false;
                                                    }
                                                    else {
                                                        note.continuesLastPattern = channel.instruments[newPattern.instruments[0]].legacyTieOver;
                                                    }
                                                }
                                            }
                                            curPart = validateRange(0, this.beatsPerBar * Config.partsPerBeat, note.end);
                                        }
                                    }
                                    newNotes.length = noteCount;
                                }
                                if (beforeThree && fromBeepBox) {
                                    break;
                                }
                                else {
                                    channelIndex++;
                                    if (channelIndex >= this.getChannelCount())
                                        break;
                                }
                            }
                            if (fromJummBox && beforeFive && songReverbIndex >= 0) {
                                for (let channelIndex = 0; channelIndex < this.channels.length; channelIndex++) {
                                    for (let instrumentIndex = 0; instrumentIndex < this.channels[channelIndex].instruments.length; instrumentIndex++) {
                                        const instrument = this.channels[channelIndex].instruments[instrumentIndex];
                                        if (effectsIncludeReverb(instrument.effects)) {
                                            instrument.reverb = Config.reverbRange - 1;
                                        }
                                        if (songReverbChannel == channelIndex && songReverbInstrument == instrumentIndex) {
                                            const patternIndex = this.channels[channelIndex].bars[0];
                                            if (patternIndex > 0) {
                                                const pattern = this.channels[channelIndex].patterns[patternIndex - 1];
                                                let lowestPart = 6;
                                                for (const note of pattern.notes) {
                                                    if (note.pitches[0] == Config.modCount - 1 - songReverbIndex) {
                                                        lowestPart = Math.min(lowestPart, note.start);
                                                    }
                                                }
                                                if (lowestPart > 0) {
                                                    pattern.notes.push(new Note(Config.modCount - 1 - songReverbIndex, 0, lowestPart, legacyGlobalReverb));
                                                }
                                            }
                                            else {
                                                if (this.channels[channelIndex].patterns.length < Config.barCountMax) {
                                                    const pattern = new Pattern();
                                                    this.channels[channelIndex].patterns.push(pattern);
                                                    this.channels[channelIndex].bars[0] = this.channels[channelIndex].patterns.length;
                                                    if (this.channels[channelIndex].patterns.length > this.patternsPerChannel) {
                                                        for (let chn = 0; chn < this.channels.length; chn++) {
                                                            if (this.channels[chn].patterns.length <= this.patternsPerChannel) {
                                                                this.channels[chn].patterns.push(new Pattern());
                                                            }
                                                        }
                                                        this.patternsPerChannel++;
                                                    }
                                                    pattern.instruments.length = 1;
                                                    pattern.instruments[0] = songReverbInstrument;
                                                    pattern.notes.length = 0;
                                                    pattern.notes.push(new Note(Config.modCount - 1 - songReverbIndex, 0, 6, legacyGlobalReverb));
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    default:
                        {
                            throw new Error("Unrecognized song tag code " + String.fromCharCode(command) + " at index " + (charIndex - 1));
                        }
                }
        }
        toJsonObject(enableIntro = true, loopCount = 1, enableOutro = true) {
            const channelArray = [];
            for (let channelIndex = 0; channelIndex < this.getChannelCount(); channelIndex++) {
                const channel = this.channels[channelIndex];
                const instrumentArray = [];
                const isNoiseChannel = this.getChannelIsNoise(channelIndex);
                const isModChannel = this.getChannelIsMod(channelIndex);
                for (const instrument of channel.instruments) {
                    instrumentArray.push(instrument.toJsonObject());
                }
                const patternArray = [];
                for (const pattern of channel.patterns) {
                    patternArray.push(pattern.toJsonObject(this, channel, isModChannel));
                }
                const sequenceArray = [];
                if (enableIntro)
                    for (let i = 0; i < this.loopStart; i++) {
                        sequenceArray.push(channel.bars[i]);
                    }
                for (let l = 0; l < loopCount; l++)
                    for (let i = this.loopStart; i < this.loopStart + this.loopLength; i++) {
                        sequenceArray.push(channel.bars[i]);
                    }
                if (enableOutro)
                    for (let i = this.loopStart + this.loopLength; i < this.barCount; i++) {
                        sequenceArray.push(channel.bars[i]);
                    }
                const channelObject = {
                    "type": isModChannel ? "mod" : (isNoiseChannel ? "drum" : "pitch"),
                    "name": channel.name,
                    "instruments": instrumentArray,
                    "patterns": patternArray,
                    "sequence": sequenceArray,
                };
                if (!isNoiseChannel) {
                    channelObject["octaveScrollBar"] = channel.octave - 1;
                }
                channelArray.push(channelObject);
            }
            return {
                "name": this.title,
                "format": Song._format,
                "version": Song._latestJummBoxVersion,
                "scale": Config.scales[this.scale].name,
                "key": Config.keys[this.key].name,
                "introBars": this.loopStart,
                "loopBars": this.loopLength,
                "beatsPerBar": this.beatsPerBar,
                "ticksPerBeat": Config.rhythms[this.rhythm].stepsPerBeat,
                "beatsPerMinute": this.tempo,
                "reverb": this.reverb,
                "masterGain": this.masterGain,
                "compressionThreshold": this.compressionThreshold,
                "limitThreshold": this.limitThreshold,
                "limitDecay": this.limitDecay,
                "limitRise": this.limitRise,
                "limitRatio": this.limitRatio,
                "compressionRatio": this.compressionRatio,
                "layeredInstruments": this.layeredInstruments,
                "patternInstruments": this.patternInstruments,
                "channels": channelArray,
            };
        }
        fromJsonObject(jsonObject) {
            this.initToDefault(true);
            if (!jsonObject)
                return;
            if (jsonObject["name"] != undefined) {
                this.title = jsonObject["name"];
            }
            this.scale = 0;
            if (jsonObject["scale"] != undefined) {
                const oldScaleNames = {
                    "romani :)": "dbl harmonic :)",
                    "romani :(": "dbl harmonic :(",
                    "enigma": "strange",
                };
                const scaleName = (oldScaleNames[jsonObject["scale"]] != undefined) ? oldScaleNames[jsonObject["scale"]] : jsonObject["scale"];
                const scale = Config.scales.findIndex(scale => scale.name == scaleName);
                if (scale != -1)
                    this.scale = scale;
            }
            if (jsonObject["key"] != undefined) {
                if (typeof (jsonObject["key"]) == "number") {
                    this.key = ((jsonObject["key"] + 1200) >>> 0) % Config.keys.length;
                }
                else if (typeof (jsonObject["key"]) == "string") {
                    const key = jsonObject["key"];
                    const letter = key.charAt(0).toUpperCase();
                    const symbol = key.charAt(1).toLowerCase();
                    const letterMap = { "C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11 };
                    const accidentalMap = { "#": 1, "♯": 1, "b": -1, "♭": -1 };
                    let index = letterMap[letter];
                    const offset = accidentalMap[symbol];
                    if (index != undefined) {
                        if (offset != undefined)
                            index += offset;
                        if (index < 0)
                            index += 12;
                        index = index % 12;
                        this.key = index;
                    }
                }
            }
            if (jsonObject["beatsPerMinute"] != undefined) {
                this.tempo = clamp(Config.tempoMin, Config.tempoMax + 1, jsonObject["beatsPerMinute"] | 0);
            }
            let legacyGlobalReverb = 0;
            if (jsonObject["reverb"] != undefined) {
                legacyGlobalReverb = clamp(0, 32, jsonObject["reverb"] | 0);
            }
            if (jsonObject["beatsPerBar"] != undefined) {
                this.beatsPerBar = Math.max(Config.beatsPerBarMin, Math.min(Config.beatsPerBarMax, jsonObject["beatsPerBar"] | 0));
            }
            let importedPartsPerBeat = 4;
            if (jsonObject["ticksPerBeat"] != undefined) {
                importedPartsPerBeat = (jsonObject["ticksPerBeat"] | 0) || 4;
                this.rhythm = Config.rhythms.findIndex(rhythm => rhythm.stepsPerBeat == importedPartsPerBeat);
                if (this.rhythm == -1) {
                    this.rhythm = 1;
                }
            }
            if (jsonObject["masterGain"] != undefined) {
                this.masterGain = Math.max(0.0, Math.min(5.0, jsonObject["masterGain"] || 0));
            }
            else {
                this.masterGain = 1.0;
            }
            if (jsonObject["limitThreshold"] != undefined) {
                this.limitThreshold = Math.max(0.0, Math.min(2.0, jsonObject["limitThreshold"] || 0));
            }
            else {
                this.limitThreshold = 1.0;
            }
            if (jsonObject["compressionThreshold"] != undefined) {
                this.compressionThreshold = Math.max(0.0, Math.min(1.1, jsonObject["compressionThreshold"] || 0));
            }
            else {
                this.compressionThreshold = 1.0;
            }
            if (jsonObject["limitRise"] != undefined) {
                this.limitRise = Math.max(2000.0, Math.min(10000.0, jsonObject["limitRise"] || 0));
            }
            else {
                this.limitRise = 4000.0;
            }
            if (jsonObject["limitDecay"] != undefined) {
                this.limitDecay = Math.max(1.0, Math.min(30.0, jsonObject["limitDecay"] || 0));
            }
            else {
                this.limitDecay = 4.0;
            }
            if (jsonObject["limitRatio"] != undefined) {
                this.limitRatio = Math.max(0.0, Math.min(11.0, jsonObject["limitRatio"] || 0));
            }
            else {
                this.limitRatio = 1.0;
            }
            if (jsonObject["compressionRatio"] != undefined) {
                this.compressionRatio = Math.max(0.0, Math.min(1.168, jsonObject["compressionRatio"] || 0));
            }
            else {
                this.compressionRatio = 1.0;
            }
            let maxInstruments = 1;
            let maxPatterns = 1;
            let maxBars = 1;
            if (jsonObject["channels"] != undefined) {
                for (const channelObject of jsonObject["channels"]) {
                    if (channelObject["instruments"])
                        maxInstruments = Math.max(maxInstruments, channelObject["instruments"].length | 0);
                    if (channelObject["patterns"])
                        maxPatterns = Math.max(maxPatterns, channelObject["patterns"].length | 0);
                    if (channelObject["sequence"])
                        maxBars = Math.max(maxBars, channelObject["sequence"].length | 0);
                }
            }
            if (jsonObject["layeredInstruments"] != undefined) {
                this.layeredInstruments = !!jsonObject["layeredInstruments"];
            }
            else {
                this.layeredInstruments = false;
            }
            if (jsonObject["patternInstruments"] != undefined) {
                this.patternInstruments = !!jsonObject["patternInstruments"];
            }
            else {
                this.patternInstruments = (maxInstruments > 1);
            }
            this.patternsPerChannel = Math.min(maxPatterns, Config.barCountMax);
            this.barCount = Math.min(maxBars, Config.barCountMax);
            if (jsonObject["introBars"] != undefined) {
                this.loopStart = clamp(0, this.barCount, jsonObject["introBars"] | 0);
            }
            if (jsonObject["loopBars"] != undefined) {
                this.loopLength = clamp(1, this.barCount - this.loopStart + 1, jsonObject["loopBars"] | 0);
            }
            const newPitchChannels = [];
            const newNoiseChannels = [];
            const newModChannels = [];
            if (jsonObject["channels"] != undefined) {
                for (let channelIndex = 0; channelIndex < jsonObject["channels"].length; channelIndex++) {
                    let channelObject = jsonObject["channels"][channelIndex];
                    const channel = new Channel();
                    let isNoiseChannel = false;
                    let isModChannel = false;
                    if (channelObject["type"] != undefined) {
                        isNoiseChannel = (channelObject["type"] == "drum");
                        isModChannel = (channelObject["type"] == "mod");
                    }
                    else {
                        isNoiseChannel = (channelIndex >= 3);
                    }
                    if (isNoiseChannel) {
                        newNoiseChannels.push(channel);
                    }
                    else if (isModChannel) {
                        newModChannels.push(channel);
                    }
                    else {
                        newPitchChannels.push(channel);
                    }
                    if (channelObject["octaveScrollBar"] != undefined) {
                        channel.octave = clamp(0, Config.pitchOctaves, (channelObject["octaveScrollBar"] | 0) + 1);
                        if (isNoiseChannel)
                            channel.octave = 0;
                    }
                    if (channelObject["name"] != undefined) {
                        channel.name = channelObject["name"];
                    }
                    else {
                        channel.name = "";
                    }
                    if (Array.isArray(channelObject["instruments"])) {
                        const instrumentObjects = channelObject["instruments"];
                        for (let i = 0; i < instrumentObjects.length; i++) {
                            if (i >= this.getMaxInstrumentsPerChannel())
                                break;
                            const instrument = new Instrument(isNoiseChannel, isModChannel);
                            channel.instruments[i] = instrument;
                            instrument.fromJsonObject(instrumentObjects[i], isNoiseChannel, isModChannel, false, false, legacyGlobalReverb);
                        }
                    }
                    for (let i = 0; i < this.patternsPerChannel; i++) {
                        const pattern = new Pattern();
                        channel.patterns[i] = pattern;
                        let patternObject = undefined;
                        if (channelObject["patterns"])
                            patternObject = channelObject["patterns"][i];
                        if (patternObject == undefined)
                            continue;
                        pattern.fromJsonObject(patternObject, this, channel, importedPartsPerBeat, isNoiseChannel, isModChannel);
                    }
                    channel.patterns.length = this.patternsPerChannel;
                    for (let i = 0; i < this.barCount; i++) {
                        channel.bars[i] = (channelObject["sequence"] != undefined) ? Math.min(this.patternsPerChannel, channelObject["sequence"][i] >>> 0) : 0;
                    }
                    channel.bars.length = this.barCount;
                }
            }
            if (newPitchChannels.length > Config.pitchChannelCountMax)
                newPitchChannels.length = Config.pitchChannelCountMax;
            if (newNoiseChannels.length > Config.noiseChannelCountMax)
                newNoiseChannels.length = Config.noiseChannelCountMax;
            if (newModChannels.length > Config.modChannelCountMax)
                newModChannels.length = Config.modChannelCountMax;
            this.pitchChannelCount = newPitchChannels.length;
            this.noiseChannelCount = newNoiseChannels.length;
            this.modChannelCount = newModChannels.length;
            this.channels.length = 0;
            Array.prototype.push.apply(this.channels, newPitchChannels);
            Array.prototype.push.apply(this.channels, newNoiseChannels);
            Array.prototype.push.apply(this.channels, newModChannels);
        }
        getPattern(channelIndex, bar) {
            if (bar < 0 || bar >= this.barCount)
                return null;
            const patternIndex = this.channels[channelIndex].bars[bar];
            if (patternIndex == 0)
                return null;
            return this.channels[channelIndex].patterns[patternIndex - 1];
        }
        getBeatsPerMinute() {
            return this.tempo;
        }
        static getNeededBits(maxValue) {
            return 32 - Math.clz32(Math.ceil(maxValue + 1) - 1);
        }
        restoreLimiterDefaults() {
            this.compressionRatio = 1.0;
            this.limitRatio = 1.0;
            this.limitRise = 4000.0;
            this.limitDecay = 4.0;
            this.limitThreshold = 1.0;
            this.compressionThreshold = 1.0;
            this.masterGain = 1.0;
        }
    }
    Song._format = "BeepBox";
    Song._oldestBeepboxVersion = 2;
    Song._latestBeepboxVersion = 9;
    Song._oldestJummBoxVersion = 1;
    Song._latestJummBoxVersion = 5;
    Song._variant = 0x6A;
    class PickedString {
        constructor() {
            this.delayLine = null;
            this.allPassG = 0.0;
            this.allPassGDelta = 0.0;
            this.shelfA1 = 0.0;
            this.shelfA1Delta = 0.0;
            this.shelfB0 = 0.0;
            this.shelfB0Delta = 0.0;
            this.shelfB1 = 0.0;
            this.shelfB1Delta = 0.0;
            this.reset();
        }
        reset() {
            this.delayIndex = -1;
            this.allPassSample = 0.0;
            this.allPassPrevInput = 0.0;
            this.shelfSample = 0.0;
            this.shelfPrevInput = 0.0;
            this.fractionalDelaySample = 0.0;
            this.prevDelayLength = -1.0;
            this.delayResetOffset = 0;
        }
        update(synth, instrumentState, tone, stringIndex, roundedSamplesPerTick, stringDecayStart, stringDecayEnd) {
            const allPassCenter = 2.0 * Math.PI * Config.pickedStringDispersionCenterFreq / synth.samplesPerSecond;
            const shelfRadians = 2.0 * Math.PI * Config.pickedStringShelfHz / synth.samplesPerSecond;
            const decayCurveStart = (Math.pow(100.0, stringDecayStart) - 1.0) / 99.0;
            const decayCurveEnd = (Math.pow(100.0, stringDecayEnd) - 1.0) / 99.0;
            const prevDelayLength = this.prevDelayLength;
            const phaseDeltaStart = tone.phaseDeltas[stringIndex];
            const phaseDeltaScale = tone.phaseDeltaScales[stringIndex];
            const phaseDeltaEnd = phaseDeltaStart * Math.pow(phaseDeltaScale, roundedSamplesPerTick);
            const radiansPerSampleStart = Math.PI * 2.0 * phaseDeltaStart;
            const radiansPerSampleEnd = Math.PI * 2.0 * phaseDeltaEnd;
            const centerHarmonicStart = radiansPerSampleStart * 2.0;
            const centerHarmonicEnd = radiansPerSampleEnd * 2.0;
            const allPassRadiansStart = Math.min(Math.PI, radiansPerSampleStart * Config.pickedStringDispersionFreqMult * Math.pow(allPassCenter / radiansPerSampleStart, Config.pickedStringDispersionFreqScale));
            const allPassRadiansEnd = Math.min(Math.PI, radiansPerSampleEnd * Config.pickedStringDispersionFreqMult * Math.pow(allPassCenter / radiansPerSampleEnd, Config.pickedStringDispersionFreqScale));
            const decayRateStart = Math.pow(0.5, decayCurveStart * shelfRadians / radiansPerSampleStart);
            const decayRateEnd = Math.pow(0.5, decayCurveEnd * shelfRadians / radiansPerSampleEnd);
            const shelfGainStart = Math.pow(decayRateStart, Config.stringDecayRate);
            const shelfGainEnd = Math.pow(decayRateEnd, Config.stringDecayRate);
            const expressionDecayStart = Math.pow(decayRateStart, 0.002);
            const expressionDecayEnd = Math.pow(decayRateEnd, 0.002);
            Synth.tempFilterStartCoefficients.allPass1stOrderInvertPhaseAbove(allPassRadiansStart);
            synth.tempFrequencyResponse.analyze(Synth.tempFilterStartCoefficients, centerHarmonicStart);
            const allPassGStart = Synth.tempFilterStartCoefficients.b[0];
            const allPassPhaseDelayStart = -synth.tempFrequencyResponse.angle() / centerHarmonicStart;
            Synth.tempFilterEndCoefficients.allPass1stOrderInvertPhaseAbove(allPassRadiansEnd);
            synth.tempFrequencyResponse.analyze(Synth.tempFilterEndCoefficients, centerHarmonicEnd);
            const allPassGEnd = Synth.tempFilterEndCoefficients.b[0];
            const allPassPhaseDelayEnd = -synth.tempFrequencyResponse.angle() / centerHarmonicEnd;
            Synth.tempFilterStartCoefficients.highShelf1stOrder(shelfRadians, shelfGainStart);
            synth.tempFrequencyResponse.analyze(Synth.tempFilterStartCoefficients, centerHarmonicStart);
            const shelfA1Start = Synth.tempFilterStartCoefficients.a[1];
            const shelfB0Start = Synth.tempFilterStartCoefficients.b[0] * expressionDecayStart;
            const shelfB1Start = Synth.tempFilterStartCoefficients.b[1] * expressionDecayStart;
            const shelfPhaseDelayStart = -synth.tempFrequencyResponse.angle() / centerHarmonicStart;
            Synth.tempFilterEndCoefficients.highShelf1stOrder(shelfRadians, shelfGainEnd);
            synth.tempFrequencyResponse.analyze(Synth.tempFilterEndCoefficients, centerHarmonicEnd);
            const shelfA1End = Synth.tempFilterEndCoefficients.a[1];
            const shelfB0End = Synth.tempFilterEndCoefficients.b[0] * expressionDecayEnd;
            const shelfB1End = Synth.tempFilterEndCoefficients.b[1] * expressionDecayEnd;
            const shelfPhaseDelayEnd = -synth.tempFrequencyResponse.angle() / centerHarmonicEnd;
            const periodLengthStart = 1.0 / phaseDeltaStart;
            const periodLengthEnd = 1.0 / phaseDeltaEnd;
            const minBufferLength = Math.ceil(Math.max(periodLengthStart, periodLengthEnd) * 2);
            const delayLength = periodLengthStart - allPassPhaseDelayStart - shelfPhaseDelayStart;
            const delayLengthEnd = periodLengthEnd - allPassPhaseDelayEnd - shelfPhaseDelayEnd;
            this.prevDelayLength = delayLength;
            this.delayLengthDelta = (delayLengthEnd - delayLength) / roundedSamplesPerTick;
            this.allPassG = allPassGStart;
            this.shelfA1 = shelfA1Start;
            this.shelfB0 = shelfB0Start;
            this.shelfB1 = shelfB1Start;
            this.allPassGDelta = (allPassGEnd - allPassGStart) / roundedSamplesPerTick;
            this.shelfA1Delta = (shelfA1End - shelfA1Start) / roundedSamplesPerTick;
            this.shelfB0Delta = (shelfB0End - shelfB0Start) / roundedSamplesPerTick;
            this.shelfB1Delta = (shelfB1End - shelfB1Start) / roundedSamplesPerTick;
            const pitchChanged = Math.abs(Math.log2(delayLength / prevDelayLength)) > 0.01;
            const reinitializeImpulse = (this.delayIndex == -1 || pitchChanged);
            if (this.delayLine == null || this.delayLine.length <= minBufferLength) {
                const likelyMaximumLength = Math.ceil(2 * synth.samplesPerSecond / Instrument.frequencyFromPitch(12));
                const newDelayLine = new Float32Array(Synth.fittingPowerOfTwo(Math.max(likelyMaximumLength, minBufferLength)));
                if (!reinitializeImpulse && this.delayLine != null) {
                    const oldDelayBufferMask = (this.delayLine.length - 1) >> 0;
                    const startCopyingFromIndex = this.delayIndex + this.delayResetOffset;
                    this.delayIndex = this.delayLine.length - this.delayResetOffset;
                    for (let i = 0; i < this.delayLine.length; i++) {
                        newDelayLine[i] = this.delayLine[(startCopyingFromIndex + i) & oldDelayBufferMask];
                    }
                }
                this.delayLine = newDelayLine;
            }
            const delayLine = this.delayLine;
            const delayBufferMask = (delayLine.length - 1) >> 0;
            if (reinitializeImpulse) {
                this.delayIndex = 0;
                this.allPassSample = 0.0;
                this.allPassPrevInput = 0.0;
                this.shelfSample = 0.0;
                this.shelfPrevInput = 0.0;
                this.fractionalDelaySample = 0.0;
                const startImpulseFrom = -delayLength;
                const startZerosFrom = Math.floor(startImpulseFrom - periodLengthStart / 2);
                const stopZerosAt = Math.ceil(startZerosFrom + periodLengthStart * 2);
                this.delayResetOffset = stopZerosAt;
                for (let i = startZerosFrom; i <= stopZerosAt; i++) {
                    delayLine[i & delayBufferMask] = 0.0;
                }
                const impulseWave = instrumentState.wave;
                const impulseWaveLength = impulseWave.length - 1;
                const impulsePhaseDelta = impulseWaveLength / periodLengthStart;
                const fadeDuration = Math.min(periodLengthStart * 0.2, synth.samplesPerSecond * 0.003);
                const startImpulseFromSample = Math.ceil(startImpulseFrom);
                const stopImpulseAt = startImpulseFrom + periodLengthStart + fadeDuration;
                const stopImpulseAtSample = stopImpulseAt;
                let impulsePhase = (startImpulseFromSample - startImpulseFrom) * impulsePhaseDelta;
                let prevWaveIntegral = 0.0;
                for (let i = startImpulseFromSample; i <= stopImpulseAtSample; i++) {
                    const impulsePhaseInt = impulsePhase | 0;
                    const index = impulsePhaseInt % impulseWaveLength;
                    let nextWaveIntegral = impulseWave[index];
                    const phaseRatio = impulsePhase - impulsePhaseInt;
                    nextWaveIntegral += (impulseWave[index + 1] - nextWaveIntegral) * phaseRatio;
                    const sample = (nextWaveIntegral - prevWaveIntegral) / impulsePhaseDelta;
                    const fadeIn = Math.min(1.0, (i - startImpulseFrom) / fadeDuration);
                    const fadeOut = Math.min(1.0, (stopImpulseAt - i) / fadeDuration);
                    const combinedFade = fadeIn * fadeOut;
                    const curvedFade = combinedFade * combinedFade * (3.0 - 2.0 * combinedFade);
                    delayLine[i & delayBufferMask] += sample * curvedFade;
                    prevWaveIntegral = nextWaveIntegral;
                    impulsePhase += impulsePhaseDelta;
                }
            }
        }
    }
    class EnvelopeComputer {
        constructor() {
            this.noteSecondsStart = 0.0;
            this.noteSecondsEnd = 0.0;
            this.noteTicksStart = 0.0;
            this.noteTicksEnd = 0.0;
            this.noteSizeStart = Config.noteSizeMax;
            this.noteSizeEnd = Config.noteSizeMax;
            this.prevNoteSize = Config.noteSizeMax;
            this.nextNoteSize = Config.noteSizeMax;
            this._noteSizeFinal = Config.noteSizeMax;
            this.prevNoteSecondsStart = 0.0;
            this.prevNoteSecondsEnd = 0.0;
            this.prevNoteTicksStart = 0.0;
            this.prevNoteTicksEnd = 0.0;
            this._prevNoteSizeFinal = Config.noteSizeMax;
            this.prevSlideStart = false;
            this.prevSlideEnd = false;
            this.nextSlideStart = false;
            this.nextSlideEnd = false;
            this.prevSlideRatioStart = 0.0;
            this.prevSlideRatioEnd = 0.0;
            this.nextSlideRatioStart = 0.0;
            this.nextSlideRatioEnd = 0.0;
            this.envelopeStarts = [];
            this.envelopeEnds = [];
            this._modifiedEnvelopeIndices = [];
            this._modifiedEnvelopeCount = 0;
            this.lowpassCutoffDecayVolumeCompensation = 1.0;
            const length = 33;
            for (let i = 0; i < length; i++) {
                this.envelopeStarts[i] = 1.0;
                this.envelopeEnds[i] = 1.0;
            }
            this.reset();
        }
        reset() {
            this.noteSecondsEnd = 0.0;
            this.noteTicksEnd = 0.0;
            this._noteSizeFinal = Config.noteSizeMax;
            this.prevNoteSecondsEnd = 0.0;
            this.prevNoteTicksEnd = 0.0;
            this._prevNoteSizeFinal = Config.noteSizeMax;
            this._modifiedEnvelopeCount = 0;
        }
        computeEnvelopes(instrument, currentPart, tickTimeStart, secondsPerTick, tone) {
            const transition = instrument.getTransition();
            if (tone != null && tone.atNoteStart && !transition.continues && !tone.forceContinueAtStart) {
                this.prevNoteSecondsEnd = this.noteSecondsEnd;
                this.prevNoteTicksEnd = this.noteTicksEnd;
                this._prevNoteSizeFinal = this._noteSizeFinal;
                this.noteSecondsEnd = 0.0;
                this.noteTicksEnd = 0.0;
            }
            if (tone != null) {
                if (tone.note != null) {
                    this._noteSizeFinal = tone.note.pins[tone.note.pins.length - 1].size;
                }
                else {
                    this._noteSizeFinal = Config.noteSizeMax;
                }
            }
            const tickTimeEnd = tickTimeStart + 1.0;
            const noteSecondsStart = this.noteSecondsEnd;
            const noteSecondsEnd = noteSecondsStart + secondsPerTick;
            const noteTicksStart = this.noteTicksEnd;
            const noteTicksEnd = noteTicksStart + 1.0;
            const prevNoteSecondsStart = this.prevNoteSecondsEnd;
            const prevNoteSecondsEnd = prevNoteSecondsStart + secondsPerTick;
            const prevNoteTicksStart = this.prevNoteTicksEnd;
            const prevNoteTicksEnd = prevNoteTicksStart + 1.0;
            const beatsPerTick = 1.0 / (Config.ticksPerPart * Config.partsPerBeat);
            const beatTimeStart = beatsPerTick * tickTimeStart;
            const beatTimeEnd = beatsPerTick * tickTimeEnd;
            let noteSizeStart = this._noteSizeFinal;
            let noteSizeEnd = this._noteSizeFinal;
            let prevNoteSize = this._prevNoteSizeFinal;
            let nextNoteSize = 0;
            let prevSlideStart = false;
            let prevSlideEnd = false;
            let nextSlideStart = false;
            let nextSlideEnd = false;
            let prevSlideRatioStart = 0.0;
            let prevSlideRatioEnd = 0.0;
            let nextSlideRatioStart = 0.0;
            let nextSlideRatioEnd = 0.0;
            if (tone != null && tone.note != null && !tone.passedEndOfNote) {
                const endPinIndex = tone.note.getEndPinIndex(currentPart);
                const startPin = tone.note.pins[endPinIndex - 1];
                const endPin = tone.note.pins[endPinIndex];
                const startPinTick = (tone.note.start + startPin.time) * Config.ticksPerPart;
                const endPinTick = (tone.note.start + endPin.time) * Config.ticksPerPart;
                const ratioStart = (tickTimeStart - startPinTick) / (endPinTick - startPinTick);
                const ratioEnd = (tickTimeEnd - startPinTick) / (endPinTick - startPinTick);
                noteSizeStart = startPin.size + (endPin.size - startPin.size) * ratioStart;
                noteSizeEnd = startPin.size + (endPin.size - startPin.size) * ratioEnd;
                if (transition.slides) {
                    const noteStartTick = tone.noteStartPart * Config.ticksPerPart;
                    const noteEndTick = tone.noteEndPart * Config.ticksPerPart;
                    const noteLengthTicks = noteEndTick - noteStartTick;
                    const maximumSlideTicks = noteLengthTicks * 0.5;
                    const slideTicks = Math.min(maximumSlideTicks, transition.slideTicks);
                    if (tone.prevNote != null && !tone.forceContinueAtStart) {
                        if (tickTimeStart - noteStartTick < slideTicks) {
                            prevSlideStart = true;
                            prevSlideRatioStart = 0.5 * (1.0 - (tickTimeStart - noteStartTick) / slideTicks);
                        }
                        if (tickTimeEnd - noteStartTick < slideTicks) {
                            prevSlideEnd = true;
                            prevSlideRatioEnd = 0.5 * (1.0 - (tickTimeEnd - noteStartTick) / slideTicks);
                        }
                    }
                    if (tone.nextNote != null && !tone.forceContinueAtEnd) {
                        nextNoteSize = tone.nextNote.pins[0].size;
                        if (noteEndTick - tickTimeStart < slideTicks) {
                            nextSlideStart = true;
                            nextSlideRatioStart = 0.5 * (1.0 - (noteEndTick - tickTimeStart) / slideTicks);
                        }
                        if (noteEndTick - tickTimeEnd < slideTicks) {
                            nextSlideEnd = true;
                            nextSlideRatioEnd = 0.5 * (1.0 - (noteEndTick - tickTimeEnd) / slideTicks);
                        }
                    }
                }
            }
            let lowpassCutoffDecayVolumeCompensation = 1.0;
            let usedNoteSize = false;
            for (let envelopeIndex = 0; envelopeIndex <= instrument.envelopeCount; envelopeIndex++) {
                let automationTarget;
                let targetIndex;
                let envelope;
                if (envelopeIndex == instrument.envelopeCount) {
                    if (usedNoteSize)
                        break;
                    automationTarget = Config.instrumentAutomationTargets.dictionary["noteVolume"];
                    targetIndex = 0;
                    envelope = Config.envelopes.dictionary["note size"];
                }
                else {
                    let envelopeSettings = instrument.envelopes[envelopeIndex];
                    automationTarget = Config.instrumentAutomationTargets[envelopeSettings.target];
                    targetIndex = envelopeSettings.index;
                    envelope = Config.envelopes[envelopeSettings.envelope];
                    if (envelope.type == 0)
                        usedNoteSize = true;
                }
                if (automationTarget.computeIndex != null) {
                    const computeIndex = automationTarget.computeIndex + targetIndex;
                    let envelopeStart = EnvelopeComputer.computeEnvelope(envelope, noteSecondsStart, beatTimeStart, noteSizeStart);
                    let envelopeEnd = EnvelopeComputer.computeEnvelope(envelope, noteSecondsEnd, beatTimeEnd, noteSizeEnd);
                    if (prevSlideStart) {
                        const other = EnvelopeComputer.computeEnvelope(envelope, prevNoteSecondsStart, beatTimeStart, prevNoteSize);
                        envelopeStart += (other - envelopeStart) * prevSlideRatioStart;
                    }
                    if (prevSlideEnd) {
                        const other = EnvelopeComputer.computeEnvelope(envelope, prevNoteSecondsEnd, beatTimeEnd, prevNoteSize);
                        envelopeEnd += (other - envelopeEnd) * prevSlideRatioEnd;
                    }
                    if (nextSlideStart) {
                        const other = EnvelopeComputer.computeEnvelope(envelope, 0.0, beatTimeStart, nextNoteSize);
                        envelopeStart += (other - envelopeStart) * nextSlideRatioStart;
                    }
                    if (nextSlideEnd) {
                        const other = EnvelopeComputer.computeEnvelope(envelope, 0.0, beatTimeEnd, nextNoteSize);
                        envelopeEnd += (other - envelopeEnd) * nextSlideRatioEnd;
                    }
                    this.envelopeStarts[computeIndex] *= envelopeStart;
                    this.envelopeEnds[computeIndex] *= envelopeEnd;
                    this._modifiedEnvelopeIndices[this._modifiedEnvelopeCount++] = computeIndex;
                    if (automationTarget.isFilter) {
                        const filterSettings = (instrument.tmpNoteFilterStart != null) ? instrument.tmpNoteFilterStart : instrument.noteFilter;
                        if (filterSettings.controlPointCount > targetIndex && filterSettings.controlPoints[targetIndex].type == 0) {
                            lowpassCutoffDecayVolumeCompensation = Math.max(lowpassCutoffDecayVolumeCompensation, EnvelopeComputer.getLowpassCutoffDecayVolumeCompensation(envelope));
                        }
                    }
                }
            }
            this.noteSecondsStart = noteSecondsStart;
            this.noteSecondsEnd = noteSecondsEnd;
            this.noteTicksStart = noteTicksStart;
            this.noteTicksEnd = noteTicksEnd;
            this.prevNoteSecondsStart = prevNoteSecondsStart;
            this.prevNoteSecondsEnd = prevNoteSecondsEnd;
            this.prevNoteTicksStart = prevNoteTicksStart;
            this.prevNoteTicksEnd = prevNoteTicksEnd;
            this.prevNoteSize = prevNoteSize;
            this.nextNoteSize = nextNoteSize;
            this.noteSizeStart = noteSizeStart;
            this.noteSizeEnd = noteSizeEnd;
            this.prevSlideStart = prevSlideStart;
            this.prevSlideEnd = prevSlideEnd;
            this.nextSlideStart = nextSlideStart;
            this.nextSlideEnd = nextSlideEnd;
            this.prevSlideRatioStart = prevSlideRatioStart;
            this.prevSlideRatioEnd = prevSlideRatioEnd;
            this.nextSlideRatioStart = nextSlideRatioStart;
            this.nextSlideRatioEnd = nextSlideRatioEnd;
            this.lowpassCutoffDecayVolumeCompensation = lowpassCutoffDecayVolumeCompensation;
        }
        clearEnvelopes() {
            for (let envelopeIndex = 0; envelopeIndex < this._modifiedEnvelopeCount; envelopeIndex++) {
                const computeIndex = this._modifiedEnvelopeIndices[envelopeIndex];
                this.envelopeStarts[computeIndex] = 1.0;
                this.envelopeEnds[computeIndex] = 1.0;
            }
            this._modifiedEnvelopeCount = 0;
        }
        static computeEnvelope(envelope, time, beats, noteSize) {
            switch (envelope.type) {
                case 0: return Synth.noteSizeToVolumeMult(noteSize);
                case 1: return 1.0;
                case 4: return 1.0 / (1.0 + time * envelope.speed);
                case 5: return 1.0 - 1.0 / (1.0 + time * envelope.speed);
                case 6: return 0.5 - Math.cos(beats * 2.0 * Math.PI * envelope.speed) * 0.5;
                case 7: return 0.75 - Math.cos(beats * 2.0 * Math.PI * envelope.speed) * 0.25;
                case 2: return Math.max(1.0, 2.0 - time * 10.0);
                case 3:
                    const attack = 0.25 / Math.sqrt(envelope.speed);
                    return time < attack ? time / attack : 1.0 / (1.0 + (time - attack) * envelope.speed);
                case 8: return Math.pow(2, -envelope.speed * time);
                default: throw new Error("Unrecognized operator envelope type.");
            }
        }
        static getLowpassCutoffDecayVolumeCompensation(envelope) {
            if (envelope.type == 8)
                return 1.25 + 0.025 * envelope.speed;
            if (envelope.type == 4)
                return 1.0 + 0.02 * envelope.speed;
            return 1.0;
        }
    }
    class Tone {
        constructor() {
            this.pitches = Array(Config.maxChordSize).fill(0);
            this.pitchCount = 0;
            this.chordSize = 0;
            this.drumsetPitch = null;
            this.note = null;
            this.prevNote = null;
            this.nextNote = null;
            this.prevNotePitchIndex = 0;
            this.nextNotePitchIndex = 0;
            this.freshlyAllocated = true;
            this.atNoteStart = false;
            this.isOnLastTick = false;
            this.passedEndOfNote = false;
            this.forceContinueAtStart = false;
            this.forceContinueAtEnd = false;
            this.noteStartPart = 0;
            this.noteEndPart = 0;
            this.ticksSinceReleased = 0;
            this.liveInputSamplesHeld = 0;
            this.lastInterval = 0;
            this.noiseSample = 0.0;
            this.stringSustainStart = 0;
            this.stringSustainEnd = 0;
            this.phases = [];
            this.operatorWaves = [];
            this.phaseDeltas = [];
            this.phaseDeltaScales = [];
            this.expression = 0.0;
            this.expressionDelta = 0.0;
            this.operatorExpressions = [];
            this.operatorExpressionDeltas = [];
            this.prevPitchExpressions = Array(Config.maxPitchOrOperatorCount).fill(null);
            this.prevVibrato = null;
            this.prevStringDecay = null;
            this.pulseWidth = 0.0;
            this.pulseWidthDelta = 0.0;
            this.pickedStrings = [];
            this.noteFilters = [];
            this.noteFilterCount = 0;
            this.initialNoteFilterInput1 = 0.0;
            this.initialNoteFilterInput2 = 0.0;
            this.specialIntervalExpressionMult = 1.0;
            this.feedbackOutputs = [];
            this.feedbackMult = 0.0;
            this.feedbackDelta = 0.0;
            this.stereoVolumeLStart = 0.0;
            this.stereoVolumeRStart = 0.0;
            this.stereoVolumeLDelta = 0.0;
            this.stereoVolumeRDelta = 0.0;
            this.stereoDelayStart = 0.0;
            this.stereoDelayEnd = 0.0;
            this.stereoDelayDelta = 0.0;
            this.customVolumeStart = 0.0;
            this.customVolumeEnd = 0.0;
            this.filterResonanceStart = 0.0;
            this.filterResonanceDelta = 0.0;
            this.isFirstOrder = false;
            this.envelopeComputer = new EnvelopeComputer();
            this.reset();
        }
        reset() {
            this.noiseSample = 0.0;
            for (let i = 0; i < Config.maxPitchOrOperatorCount; i++) {
                this.phases[i] = 0.0;
                this.operatorWaves[i] = Config.operatorWaves[0];
                this.feedbackOutputs[i] = 0.0;
                this.prevPitchExpressions[i] = null;
            }
            for (let i = 0; i < this.noteFilterCount; i++) {
                this.noteFilters[i].resetOutput();
            }
            this.noteFilterCount = 0;
            this.initialNoteFilterInput1 = 0.0;
            this.initialNoteFilterInput2 = 0.0;
            this.liveInputSamplesHeld = 0;
            for (const pickedString of this.pickedStrings) {
                pickedString.reset();
            }
            this.envelopeComputer.reset();
            this.prevVibrato = null;
            this.prevStringDecay = null;
            this.drumsetPitch = null;
        }
    }
    class InstrumentState {
        constructor() {
            this.awake = false;
            this.computed = false;
            this.tonesAddedInThisTick = false;
            this.flushingDelayLines = false;
            this.deactivateAfterThisTick = false;
            this.attentuationProgress = 0.0;
            this.flushedSamples = 0;
            this.activeTones = new Deque();
            this.activeModTones = new Deque();
            this.releasedTones = new Deque();
            this.liveInputTones = new Deque();
            this.type = 0;
            this.synthesizer = null;
            this.wave = null;
            this.noisePitchFilterMult = 1.0;
            this.unison = null;
            this.chord = null;
            this.effects = 0;
            this.volumeScale = 0;
            this.aliases = false;
            this.eqFilterVolume = 1.0;
            this.eqFilterVolumeDelta = 0.0;
            this.mixVolume = 1.0;
            this.mixVolumeDelta = 0.0;
            this.delayInputMult = 0.0;
            this.delayInputMultDelta = 0.0;
            this.distortion = 0.0;
            this.distortionDelta = 0.0;
            this.distortionDrive = 0.0;
            this.distortionDriveDelta = 0.0;
            this.distortionFractionalInput1 = 0.0;
            this.distortionFractionalInput2 = 0.0;
            this.distortionFractionalInput3 = 0.0;
            this.distortionPrevInput = 0.0;
            this.distortionNextOutput = 0.0;
            this.bitcrusherPrevInput = 0.0;
            this.bitcrusherCurrentOutput = 0.0;
            this.bitcrusherPhase = 1.0;
            this.bitcrusherPhaseDelta = 0.0;
            this.bitcrusherPhaseDeltaScale = 1.0;
            this.bitcrusherScale = 1.0;
            this.bitcrusherScaleScale = 1.0;
            this.bitcrusherFoldLevel = 1.0;
            this.bitcrusherFoldLevelScale = 1.0;
            this.eqFilters = [];
            this.eqFilterCount = 0;
            this.initialEqFilterInput1 = 0.0;
            this.initialEqFilterInput2 = 0.0;
            this.panningDelayLine = null;
            this.panningDelayPos = 0;
            this.panningVolumeL = 0.0;
            this.panningVolumeR = 0.0;
            this.panningVolumeDeltaL = 0.0;
            this.panningVolumeDeltaR = 0.0;
            this.panningOffsetL = 0.0;
            this.panningOffsetR = 0.0;
            this.panningOffsetDeltaL = 0.0;
            this.panningOffsetDeltaR = 0.0;
            this.chorusDelayLineL = null;
            this.chorusDelayLineR = null;
            this.chorusDelayLineDirty = false;
            this.chorusDelayPos = 0;
            this.chorusPhase = 0;
            this.chorusVoiceMult = 0;
            this.chorusVoiceMultDelta = 0;
            this.chorusCombinedMult = 0;
            this.chorusCombinedMultDelta = 0;
            this.echoDelayLineL = null;
            this.echoDelayLineR = null;
            this.echoDelayLineDirty = false;
            this.echoDelayPos = 0;
            this.echoDelayOffsetStart = 0;
            this.echoDelayOffsetEnd = null;
            this.echoDelayOffsetRatio = 0.0;
            this.echoDelayOffsetRatioDelta = 0.0;
            this.echoMult = 0.0;
            this.echoMultDelta = 0.0;
            this.echoShelfA1 = 0.0;
            this.echoShelfB0 = 0.0;
            this.echoShelfB1 = 0.0;
            this.echoShelfSampleL = 0.0;
            this.echoShelfSampleR = 0.0;
            this.echoShelfPrevInputL = 0.0;
            this.echoShelfPrevInputR = 0.0;
            this.reverbDelayLine = null;
            this.reverbDelayLineDirty = false;
            this.reverbDelayPos = 0;
            this.reverbMult = 0.0;
            this.reverbMultDelta = 0.0;
            this.reverbShelfA1 = 0.0;
            this.reverbShelfB0 = 0.0;
            this.reverbShelfB1 = 0.0;
            this.reverbShelfSample0 = 0.0;
            this.reverbShelfSample1 = 0.0;
            this.reverbShelfSample2 = 0.0;
            this.reverbShelfSample3 = 0.0;
            this.reverbShelfPrevInput0 = 0.0;
            this.reverbShelfPrevInput1 = 0.0;
            this.reverbShelfPrevInput2 = 0.0;
            this.reverbShelfPrevInput3 = 0.0;
            this.invertWave = false;
            this.spectrumWave = new SpectrumWaveState();
            this.harmonicsWave = new HarmonicsWaveState();
            this.drumsetSpectrumWaves = [];
            for (let i = 0; i < Config.drumCount; i++) {
                this.drumsetSpectrumWaves[i] = new SpectrumWaveState();
            }
        }
        allocateNecessaryBuffers(synth, instrument, samplesPerTick) {
            if (effectsIncludePanning(instrument.effects)) {
                if (this.panningDelayLine == null || this.panningDelayLine.length < synth.panningDelayBufferSize) {
                    this.panningDelayLine = new Float32Array(synth.panningDelayBufferSize);
                }
            }
            if (effectsIncludeChorus(instrument.effects)) {
                if (this.chorusDelayLineL == null || this.chorusDelayLineL.length < synth.chorusDelayBufferSize) {
                    this.chorusDelayLineL = new Float32Array(synth.chorusDelayBufferSize);
                }
                if (this.chorusDelayLineR == null || this.chorusDelayLineR.length < synth.chorusDelayBufferSize) {
                    this.chorusDelayLineR = new Float32Array(synth.chorusDelayBufferSize);
                }
            }
            if (effectsIncludeEcho(instrument.effects)) {
                const safeEchoDelaySteps = Math.max(Config.echoDelayRange >> 1, (instrument.echoDelay + 1));
                const baseEchoDelayBufferSize = Synth.fittingPowerOfTwo(safeEchoDelaySteps * Config.echoDelayStepTicks * samplesPerTick);
                const safeEchoDelayBufferSize = baseEchoDelayBufferSize * 2;
                if (this.echoDelayLineL == null || this.echoDelayLineR == null) {
                    this.echoDelayLineL = new Float32Array(safeEchoDelayBufferSize);
                    this.echoDelayLineR = new Float32Array(safeEchoDelayBufferSize);
                }
                else if (this.echoDelayLineL.length < safeEchoDelayBufferSize || this.echoDelayLineR.length < safeEchoDelayBufferSize) {
                    const newDelayLineL = new Float32Array(safeEchoDelayBufferSize);
                    const newDelayLineR = new Float32Array(safeEchoDelayBufferSize);
                    const oldMask = this.echoDelayLineL.length - 1;
                    for (let i = 0; i < this.echoDelayLineL.length; i++) {
                        newDelayLineL[i] = this.echoDelayLineL[(this.echoDelayPos + i) & oldMask];
                        newDelayLineR[i] = this.echoDelayLineL[(this.echoDelayPos + i) & oldMask];
                    }
                    this.echoDelayPos = this.echoDelayLineL.length;
                    this.echoDelayLineL = newDelayLineL;
                    this.echoDelayLineR = newDelayLineR;
                }
            }
            if (effectsIncludeReverb(instrument.effects)) {
                if (this.reverbDelayLine == null) {
                    this.reverbDelayLine = new Float32Array(Config.reverbDelayBufferSize);
                }
            }
        }
        deactivate() {
            this.bitcrusherPrevInput = 0.0;
            this.bitcrusherCurrentOutput = 0.0;
            this.bitcrusherPhase = 1.0;
            for (let i = 0; i < this.eqFilterCount; i++) {
                this.eqFilters[i].resetOutput();
            }
            this.eqFilterCount = 0;
            this.initialEqFilterInput1 = 0.0;
            this.initialEqFilterInput2 = 0.0;
            this.distortionFractionalInput1 = 0.0;
            this.distortionFractionalInput2 = 0.0;
            this.distortionFractionalInput3 = 0.0;
            this.distortionPrevInput = 0.0;
            this.distortionNextOutput = 0.0;
            this.panningDelayPos = 0;
            if (this.panningDelayLine != null)
                for (let i = 0; i < this.panningDelayLine.length; i++)
                    this.panningDelayLine[i] = 0.0;
            this.echoDelayOffsetEnd = null;
            this.echoShelfSampleL = 0.0;
            this.echoShelfSampleR = 0.0;
            this.echoShelfPrevInputL = 0.0;
            this.echoShelfPrevInputR = 0.0;
            this.reverbShelfSample0 = 0.0;
            this.reverbShelfSample1 = 0.0;
            this.reverbShelfSample2 = 0.0;
            this.reverbShelfSample3 = 0.0;
            this.reverbShelfPrevInput0 = 0.0;
            this.reverbShelfPrevInput1 = 0.0;
            this.reverbShelfPrevInput2 = 0.0;
            this.reverbShelfPrevInput3 = 0.0;
            this.volumeScale = 1.0;
            this.aliases = false;
            this.awake = false;
            this.flushingDelayLines = false;
            this.deactivateAfterThisTick = false;
            this.attentuationProgress = 0.0;
            this.flushedSamples = 0;
        }
        resetAllEffects() {
            this.deactivate();
            if (this.chorusDelayLineDirty) {
                for (let i = 0; i < this.chorusDelayLineL.length; i++)
                    this.chorusDelayLineL[i] = 0.0;
                for (let i = 0; i < this.chorusDelayLineR.length; i++)
                    this.chorusDelayLineR[i] = 0.0;
            }
            if (this.echoDelayLineDirty) {
                for (let i = 0; i < this.echoDelayLineL.length; i++)
                    this.echoDelayLineL[i] = 0.0;
                for (let i = 0; i < this.echoDelayLineR.length; i++)
                    this.echoDelayLineR[i] = 0.0;
            }
            if (this.reverbDelayLineDirty) {
                for (let i = 0; i < this.reverbDelayLine.length; i++)
                    this.reverbDelayLine[i] = 0.0;
            }
            this.chorusPhase = 0.0;
        }
        compute(synth, instrument, samplesPerTick, roundedSamplesPerTick, tone, channelIndex, instrumentIndex) {
            this.computed = true;
            this.invertWave = instrument.invertWave;
            this.type = instrument.type;
            this.synthesizer = Synth.getInstrumentSynthFunction(instrument);
            this.unison = Config.unisons[instrument.unison];
            this.chord = instrument.getChord();
            this.noisePitchFilterMult = Config.chipNoises[instrument.chipNoise].pitchFilterMult;
            this.effects = instrument.effects;
            this.aliases = instrument.aliases;
            this.volumeScale = 1.0;
            this.allocateNecessaryBuffers(synth, instrument, samplesPerTick);
            const samplesPerSecond = synth.samplesPerSecond;
            this.updateWaves(instrument, samplesPerSecond);
            const usesDistortion = effectsIncludeDistortion(this.effects);
            const usesBitcrusher = effectsIncludeBitcrusher(this.effects);
            const usesPanning = effectsIncludePanning(this.effects);
            const usesChorus = effectsIncludeChorus(this.effects);
            const usesEcho = effectsIncludeEcho(this.effects);
            const usesReverb = effectsIncludeReverb(this.effects);
            if (usesDistortion) {
                let useDistortionStart = instrument.distortion;
                let useDistortionEnd = instrument.distortion;
                if (synth.isModActive(Config.modulators.dictionary["distortion"].index, channelIndex, instrumentIndex)) {
                    useDistortionStart = synth.getModValue(Config.modulators.dictionary["distortion"].index, channelIndex, instrumentIndex, false);
                    useDistortionEnd = synth.getModValue(Config.modulators.dictionary["distortion"].index, channelIndex, instrumentIndex, true);
                }
                const distortionSliderStart = Math.min(1.0, useDistortionStart / (Config.distortionRange - 1));
                const distortionSliderEnd = Math.min(1.0, useDistortionEnd / (Config.distortionRange - 1));
                const distortionStart = Math.pow(1.0 - 0.895 * (Math.pow(20.0, distortionSliderStart) - 1.0) / 19.0, 2.0);
                const distortionEnd = Math.pow(1.0 - 0.895 * (Math.pow(20.0, distortionSliderEnd) - 1.0) / 19.0, 2.0);
                const distortionDriveStart = (1.0 + 2.0 * distortionSliderStart) / Config.distortionBaseVolume;
                const distortionDriveEnd = (1.0 + 2.0 * distortionSliderEnd) / Config.distortionBaseVolume;
                this.distortion = distortionStart;
                this.distortionDelta = (distortionEnd - distortionStart) / roundedSamplesPerTick;
                this.distortionDrive = distortionDriveStart;
                this.distortionDriveDelta = (distortionDriveEnd - distortionDriveStart) / roundedSamplesPerTick;
            }
            if (usesBitcrusher) {
                let freqSettingStart = instrument.bitcrusherFreq;
                let freqSettingEnd = instrument.bitcrusherFreq;
                if (synth.isModActive(Config.modulators.dictionary["freq crush"].index, channelIndex, instrumentIndex)) {
                    freqSettingStart = synth.getModValue(Config.modulators.dictionary["freq crush"].index, channelIndex, instrumentIndex, false);
                    freqSettingEnd = synth.getModValue(Config.modulators.dictionary["freq crush"].index, channelIndex, instrumentIndex, true);
                }
                let quantizationSettingStart = instrument.bitcrusherQuantization;
                let quantizationSettingEnd = instrument.bitcrusherQuantization;
                if (synth.isModActive(Config.modulators.dictionary["bit crush"].index, channelIndex, instrumentIndex)) {
                    quantizationSettingStart = synth.getModValue(Config.modulators.dictionary["bit crush"].index, channelIndex, instrumentIndex, false);
                    quantizationSettingEnd = synth.getModValue(Config.modulators.dictionary["bit crush"].index, channelIndex, instrumentIndex, true);
                }
                const basePitch = Config.keys[synth.song.key].basePitch;
                const freqStart = Instrument.frequencyFromPitch(basePitch + 60) * Math.pow(2.0, (Config.bitcrusherFreqRange - 1 - freqSettingStart) * Config.bitcrusherOctaveStep);
                const freqEnd = Instrument.frequencyFromPitch(basePitch + 60) * Math.pow(2.0, (Config.bitcrusherFreqRange - 1 - freqSettingEnd) * Config.bitcrusherOctaveStep);
                const phaseDeltaStart = Math.min(1.0, freqStart / samplesPerSecond);
                const phaseDeltaEnd = Math.min(1.0, freqEnd / samplesPerSecond);
                this.bitcrusherPhaseDelta = phaseDeltaStart;
                this.bitcrusherPhaseDeltaScale = Math.pow(phaseDeltaEnd / phaseDeltaStart, 1.0 / roundedSamplesPerTick);
                const scaleStart = 2.0 * Config.bitcrusherBaseVolume * Math.pow(2.0, 1.0 - Math.pow(2.0, (Config.bitcrusherQuantizationRange - 1 - quantizationSettingStart) * 0.5));
                const scaleEnd = 2.0 * Config.bitcrusherBaseVolume * Math.pow(2.0, 1.0 - Math.pow(2.0, (Config.bitcrusherQuantizationRange - 1 - quantizationSettingEnd) * 0.5));
                this.bitcrusherScale = scaleStart;
                this.bitcrusherScaleScale = Math.pow(scaleEnd / scaleStart, 1.0 / roundedSamplesPerTick);
                const foldLevelStart = 2.0 * Config.bitcrusherBaseVolume * Math.pow(1.5, Config.bitcrusherQuantizationRange - 1 - quantizationSettingStart);
                const foldLevelEnd = 2.0 * Config.bitcrusherBaseVolume * Math.pow(1.5, Config.bitcrusherQuantizationRange - 1 - quantizationSettingEnd);
                this.bitcrusherFoldLevel = foldLevelStart;
                this.bitcrusherFoldLevelScale = Math.pow(foldLevelEnd / foldLevelStart, 1.0 / roundedSamplesPerTick);
            }
            let eqFilterVolume = 1.0;
            if (instrument.eqFilterType) {
                const eqFilterSettingsStart = instrument.eqFilter;
                if (instrument.eqSubFilters[1] == null)
                    instrument.eqSubFilters[1] = new FilterSettings();
                const eqFilterSettingsEnd = instrument.eqSubFilters[1];
                let startSimpleFreq = instrument.eqFilterSimpleCut;
                let startSimpleGain = instrument.eqFilterSimplePeak;
                let endSimpleFreq = instrument.eqFilterSimpleCut;
                let endSimpleGain = instrument.eqFilterSimplePeak;
                let filterChanges = false;
                if (synth.isModActive(Config.modulators.dictionary["eq filt cut"].index, channelIndex, instrumentIndex)) {
                    startSimpleFreq = synth.getModValue(Config.modulators.dictionary["eq filt cut"].index, channelIndex, instrumentIndex, false);
                    endSimpleFreq = synth.getModValue(Config.modulators.dictionary["eq filt cut"].index, channelIndex, instrumentIndex, true);
                    filterChanges = true;
                }
                if (synth.isModActive(Config.modulators.dictionary["eq filt peak"].index, channelIndex, instrumentIndex)) {
                    startSimpleGain = synth.getModValue(Config.modulators.dictionary["eq filt peak"].index, channelIndex, instrumentIndex, false);
                    endSimpleGain = synth.getModValue(Config.modulators.dictionary["eq filt peak"].index, channelIndex, instrumentIndex, true);
                    filterChanges = true;
                }
                let startPoint;
                if (filterChanges) {
                    eqFilterSettingsStart.convertLegacySettingsForSynth(startSimpleFreq, startSimpleGain);
                    eqFilterSettingsEnd.convertLegacySettingsForSynth(endSimpleFreq, endSimpleGain);
                    startPoint = eqFilterSettingsStart.controlPoints[0];
                    let endPoint = eqFilterSettingsEnd.controlPoints[0];
                    startPoint.toCoefficients(Synth.tempFilterStartCoefficients, samplesPerSecond, 1.0, 1.0);
                    endPoint.toCoefficients(Synth.tempFilterEndCoefficients, samplesPerSecond, 1.0, 1.0);
                    if (this.eqFilters.length < 1)
                        this.eqFilters[0] = new DynamicBiquadFilter();
                    this.eqFilters[0].loadCoefficientsWithGradient(Synth.tempFilterStartCoefficients, Synth.tempFilterEndCoefficients, 1.0 / roundedSamplesPerTick, startPoint.type == 0);
                }
                else {
                    eqFilterSettingsStart.convertLegacySettingsForSynth(startSimpleFreq, startSimpleGain, true);
                    startPoint = eqFilterSettingsStart.controlPoints[0];
                    startPoint.toCoefficients(Synth.tempFilterStartCoefficients, samplesPerSecond, 1.0, 1.0);
                    if (this.eqFilters.length < 1)
                        this.eqFilters[0] = new DynamicBiquadFilter();
                    this.eqFilters[0].loadCoefficientsWithGradient(Synth.tempFilterStartCoefficients, Synth.tempFilterStartCoefficients, 1.0 / roundedSamplesPerTick, startPoint.type == 0);
                }
                eqFilterVolume *= startPoint.getVolumeCompensationMult();
                this.eqFilterCount = 1;
                eqFilterVolume = Math.min(3.0, eqFilterVolume);
            }
            else {
                const eqFilterSettings = (instrument.tmpEqFilterStart != null) ? instrument.tmpEqFilterStart : instrument.eqFilter;
                for (let i = 0; i < eqFilterSettings.controlPointCount; i++) {
                    let startPoint = eqFilterSettings.controlPoints[i];
                    let endPoint = (instrument.tmpEqFilterEnd != null && instrument.tmpEqFilterEnd.controlPoints[i] != null) ? instrument.tmpEqFilterEnd.controlPoints[i] : eqFilterSettings.controlPoints[i];
                    if (startPoint.type != endPoint.type) {
                        startPoint = endPoint;
                    }
                    startPoint.toCoefficients(Synth.tempFilterStartCoefficients, samplesPerSecond, 1.0, 1.0);
                    endPoint.toCoefficients(Synth.tempFilterEndCoefficients, samplesPerSecond, 1.0, 1.0);
                    if (this.eqFilters.length <= i)
                        this.eqFilters[i] = new DynamicBiquadFilter();
                    this.eqFilters[i].loadCoefficientsWithGradient(Synth.tempFilterStartCoefficients, Synth.tempFilterEndCoefficients, 1.0 / roundedSamplesPerTick, startPoint.type == 0);
                    eqFilterVolume *= startPoint.getVolumeCompensationMult();
                }
                this.eqFilterCount = eqFilterSettings.controlPointCount;
                eqFilterVolume = Math.min(3.0, eqFilterVolume);
            }
            const mainInstrumentVolume = Synth.instrumentVolumeToVolumeMult(instrument.volume);
            this.mixVolume = mainInstrumentVolume;
            let mixVolumeEnd = mainInstrumentVolume;
            if (synth.isModActive(Config.modulators.dictionary["mix volume"].index, channelIndex, instrumentIndex)) {
                const startVal = synth.getModValue(Config.modulators.dictionary["mix volume"].index, channelIndex, instrumentIndex, false);
                const endVal = synth.getModValue(Config.modulators.dictionary["mix volume"].index, channelIndex, instrumentIndex, true);
                this.mixVolume *= ((startVal <= 0) ? ((startVal + Config.volumeRange / 2) / (Config.volumeRange / 2)) : Synth.instrumentVolumeToVolumeMult(startVal));
                mixVolumeEnd *= ((endVal <= 0) ? ((endVal + Config.volumeRange / 2) / (Config.volumeRange / 2)) : Synth.instrumentVolumeToVolumeMult(endVal));
            }
            if (synth.isModActive(Config.modulators.dictionary["song volume"].index)) {
                this.mixVolume *= (synth.getModValue(Config.modulators.dictionary["song volume"].index, undefined, undefined, false)) / 100.0;
                mixVolumeEnd *= (synth.getModValue(Config.modulators.dictionary["song volume"].index, undefined, undefined, true)) / 100.0;
            }
            this.mixVolumeDelta = (mixVolumeEnd - this.mixVolume) / roundedSamplesPerTick;
            let eqFilterVolumeStart = eqFilterVolume;
            let eqFilterVolumeEnd = eqFilterVolume;
            let delayInputMultStart = 1.0;
            let delayInputMultEnd = 1.0;
            if (usesPanning) {
                let usePanStart = instrument.pan;
                let usePanEnd = instrument.pan;
                if (synth.isModActive(Config.modulators.dictionary["pan"].index, channelIndex, instrumentIndex)) {
                    usePanStart = synth.getModValue(Config.modulators.dictionary["pan"].index, channelIndex, instrumentIndex, false);
                    usePanEnd = synth.getModValue(Config.modulators.dictionary["pan"].index, channelIndex, instrumentIndex, true);
                }
                let panStart = Math.max(-1.0, Math.min(1.0, (usePanStart - Config.panCenter) / Config.panCenter));
                let panEnd = Math.max(-1.0, Math.min(1.0, (usePanEnd - Config.panCenter) / Config.panCenter));
                const volumeStartL = Math.cos((1 + panStart) * Math.PI * 0.25) * 1.414;
                const volumeStartR = Math.cos((1 - panStart) * Math.PI * 0.25) * 1.414;
                const volumeEndL = Math.cos((1 + panEnd) * Math.PI * 0.25) * 1.414;
                const volumeEndR = Math.cos((1 - panEnd) * Math.PI * 0.25) * 1.414;
                const maxDelaySamples = samplesPerSecond * Config.panDelaySecondsMax;
                let usePanDelayStart = instrument.panDelay;
                let usePanDelayEnd = instrument.panDelay;
                if (synth.isModActive(Config.modulators.dictionary["pan delay"].index, channelIndex, instrumentIndex)) {
                    usePanDelayStart = synth.getModValue(Config.modulators.dictionary["pan delay"].index, channelIndex, instrumentIndex, false);
                    usePanDelayEnd = synth.getModValue(Config.modulators.dictionary["pan delay"].index, channelIndex, instrumentIndex, true);
                }
                const delayStart = panStart * usePanDelayStart * maxDelaySamples / 10;
                const delayEnd = panEnd * usePanDelayEnd * maxDelaySamples / 10;
                const delayStartL = Math.max(0.0, delayStart);
                const delayStartR = Math.max(0.0, -delayStart);
                const delayEndL = Math.max(0.0, delayEnd);
                const delayEndR = Math.max(0.0, -delayEnd);
                this.panningVolumeL = volumeStartL;
                this.panningVolumeR = volumeStartR;
                this.panningVolumeDeltaL = (volumeEndL - volumeStartL) / roundedSamplesPerTick;
                this.panningVolumeDeltaR = (volumeEndR - volumeStartR) / roundedSamplesPerTick;
                this.panningOffsetL = this.panningDelayPos - delayStartL + synth.panningDelayBufferSize;
                this.panningOffsetR = this.panningDelayPos - delayStartR + synth.panningDelayBufferSize;
                this.panningOffsetDeltaL = (delayEndL - delayStartL) / roundedSamplesPerTick;
                this.panningOffsetDeltaR = (delayEndR - delayStartR) / roundedSamplesPerTick;
            }
            if (usesChorus) {
                let useChorusStart = instrument.chorus;
                let useChorusEnd = instrument.chorus;
                if (synth.isModActive(Config.modulators.dictionary["chorus"].index, channelIndex, instrumentIndex)) {
                    useChorusStart = synth.getModValue(Config.modulators.dictionary["chorus"].index, channelIndex, instrumentIndex, false);
                    useChorusEnd = synth.getModValue(Config.modulators.dictionary["chorus"].index, channelIndex, instrumentIndex, true);
                }
                let chorusStart = Math.min(1.0, useChorusStart / (Config.chorusRange - 1));
                let chorusEnd = Math.min(1.0, useChorusEnd / (Config.chorusRange - 1));
                chorusStart = chorusStart * 0.6 + (Math.pow(chorusStart, 6.0)) * 0.4;
                chorusEnd = chorusEnd * 0.6 + (Math.pow(chorusEnd, 6.0)) * 0.4;
                const chorusCombinedMultStart = 1.0 / Math.sqrt(3.0 * chorusStart * chorusStart + 1.0);
                const chorusCombinedMultEnd = 1.0 / Math.sqrt(3.0 * chorusEnd * chorusEnd + 1.0);
                this.chorusVoiceMult = chorusStart;
                this.chorusVoiceMultDelta = (chorusEnd - chorusStart) / roundedSamplesPerTick;
                this.chorusCombinedMult = chorusCombinedMultStart;
                this.chorusCombinedMultDelta = (chorusCombinedMultEnd - chorusCombinedMultStart) / roundedSamplesPerTick;
            }
            let maxEchoMult = 0.0;
            let averageEchoDelaySeconds = 0.0;
            if (usesEcho) {
                let useEchoSustainStart = instrument.echoSustain;
                let useEchoSustainEnd = instrument.echoSustain;
                if (synth.isModActive(Config.modulators.dictionary["echo"].index, channelIndex, instrumentIndex)) {
                    useEchoSustainStart = Math.max(0.0, synth.getModValue(Config.modulators.dictionary["echo"].index, channelIndex, instrumentIndex, false));
                    useEchoSustainEnd = Math.max(0.0, synth.getModValue(Config.modulators.dictionary["echo"].index, channelIndex, instrumentIndex, true));
                }
                const echoMultStart = Math.min(1.0, Math.pow(useEchoSustainStart / Config.echoSustainRange, 1.1)) * 0.9;
                const echoMultEnd = Math.min(1.0, Math.pow(useEchoSustainEnd / Config.echoSustainRange, 1.1)) * 0.9;
                this.echoMult = echoMultStart;
                this.echoMultDelta = Math.max(0.0, (echoMultEnd - echoMultStart) / roundedSamplesPerTick);
                maxEchoMult = Math.max(echoMultStart, echoMultEnd);
                let useEchoDelayStart = instrument.echoDelay;
                let useEchoDelayEnd = instrument.echoDelay;
                let ignoreTicks = false;
                if (synth.isModActive(Config.modulators.dictionary["echo delay"].index, channelIndex, instrumentIndex)) {
                    useEchoDelayStart = synth.getModValue(Config.modulators.dictionary["echo delay"].index, channelIndex, instrumentIndex, false);
                    useEchoDelayEnd = synth.getModValue(Config.modulators.dictionary["echo delay"].index, channelIndex, instrumentIndex, true);
                    ignoreTicks = true;
                }
                const tmpEchoDelayOffsetStart = Math.round((useEchoDelayStart + 1) * Config.echoDelayStepTicks * samplesPerTick);
                const tmpEchoDelayOffsetEnd = Math.round((useEchoDelayEnd + 1) * Config.echoDelayStepTicks * samplesPerTick);
                if (this.echoDelayOffsetEnd != null && !ignoreTicks) {
                    this.echoDelayOffsetStart = this.echoDelayOffsetEnd;
                }
                else {
                    this.echoDelayOffsetStart = tmpEchoDelayOffsetStart;
                }
                this.echoDelayOffsetEnd = tmpEchoDelayOffsetEnd;
                averageEchoDelaySeconds = (this.echoDelayOffsetStart + this.echoDelayOffsetEnd) * 0.5 / samplesPerSecond;
                this.echoDelayOffsetRatio = 0.0;
                this.echoDelayOffsetRatioDelta = 1.0 / roundedSamplesPerTick;
                const shelfRadians = 2.0 * Math.PI * Config.echoShelfHz / synth.samplesPerSecond;
                Synth.tempFilterStartCoefficients.highShelf1stOrder(shelfRadians, Config.echoShelfGain);
                this.echoShelfA1 = Synth.tempFilterStartCoefficients.a[1];
                this.echoShelfB0 = Synth.tempFilterStartCoefficients.b[0];
                this.echoShelfB1 = Synth.tempFilterStartCoefficients.b[1];
            }
            let maxReverbMult = 0.0;
            if (usesReverb) {
                let useReverbStart = instrument.reverb;
                let useReverbEnd = instrument.reverb;
                if (synth.isModActive(Config.modulators.dictionary["reverb"].index, channelIndex, instrumentIndex)) {
                    useReverbStart = synth.getModValue(Config.modulators.dictionary["reverb"].index, channelIndex, instrumentIndex, false);
                    useReverbEnd = synth.getModValue(Config.modulators.dictionary["reverb"].index, channelIndex, instrumentIndex, true);
                }
                if (synth.isModActive(Config.modulators.dictionary["song reverb"].index, channelIndex, instrumentIndex)) {
                    useReverbStart *= (synth.getModValue(Config.modulators.dictionary["song reverb"].index, undefined, undefined, false) - Config.modulators.dictionary["song reverb"].convertRealFactor) / Config.reverbRange;
                    useReverbEnd *= (synth.getModValue(Config.modulators.dictionary["song reverb"].index, undefined, undefined, true) - Config.modulators.dictionary["song reverb"].convertRealFactor) / Config.reverbRange;
                }
                const reverbStart = Math.min(1.0, Math.pow(useReverbStart / Config.reverbRange, 0.667)) * 0.425;
                const reverbEnd = Math.min(1.0, Math.pow(useReverbEnd / Config.reverbRange, 0.667)) * 0.425;
                this.reverbMult = reverbStart;
                this.reverbMultDelta = (reverbEnd - reverbStart) / roundedSamplesPerTick;
                maxReverbMult = Math.max(reverbStart, reverbEnd);
                const shelfRadians = 2.0 * Math.PI * Config.reverbShelfHz / synth.samplesPerSecond;
                Synth.tempFilterStartCoefficients.highShelf1stOrder(shelfRadians, Config.reverbShelfGain);
                this.reverbShelfA1 = Synth.tempFilterStartCoefficients.a[1];
                this.reverbShelfB0 = Synth.tempFilterStartCoefficients.b[0];
                this.reverbShelfB1 = Synth.tempFilterStartCoefficients.b[1];
            }
            if (this.tonesAddedInThisTick) {
                this.attentuationProgress = 0.0;
                this.flushedSamples = 0;
                this.flushingDelayLines = false;
            }
            else if (!this.flushingDelayLines) {
                if (this.attentuationProgress == 0.0) {
                    eqFilterVolumeEnd = 0.0;
                }
                else {
                    eqFilterVolumeStart = 0.0;
                    eqFilterVolumeEnd = 0.0;
                }
                const attenuationThreshold = 1.0 / 256.0;
                const halfLifeMult = -Math.log2(attenuationThreshold);
                let delayDuration = 0.0;
                if (usesChorus) {
                    delayDuration += Config.chorusMaxDelay;
                }
                if (usesEcho) {
                    const attenuationPerSecond = Math.pow(maxEchoMult, 1.0 / averageEchoDelaySeconds);
                    const halfLife = -1.0 / Math.log2(attenuationPerSecond);
                    const echoDuration = halfLife * halfLifeMult;
                    delayDuration += echoDuration;
                }
                if (usesReverb) {
                    const averageMult = maxReverbMult * 2.0;
                    const averageReverbDelaySeconds = (Config.reverbDelayBufferSize / 4.0) / samplesPerSecond;
                    const attenuationPerSecond = Math.pow(averageMult, 1.0 / averageReverbDelaySeconds);
                    const halfLife = -1.0 / Math.log2(attenuationPerSecond);
                    const reverbDuration = halfLife * halfLifeMult;
                    delayDuration += reverbDuration;
                }
                const secondsInTick = samplesPerTick / samplesPerSecond;
                const progressInTick = secondsInTick / delayDuration;
                const progressAtEndOfTick = this.attentuationProgress + progressInTick;
                if (progressAtEndOfTick >= 1.0) {
                    delayInputMultEnd = 0.0;
                }
                this.attentuationProgress = progressAtEndOfTick;
                if (this.attentuationProgress >= 1.0) {
                    this.flushingDelayLines = true;
                }
            }
            else {
                eqFilterVolumeStart = 0.0;
                eqFilterVolumeEnd = 0.0;
                delayInputMultStart = 0.0;
                delayInputMultEnd = 0.0;
                let totalDelaySamples = 0;
                if (usesChorus)
                    totalDelaySamples += synth.chorusDelayBufferSize;
                if (usesEcho)
                    totalDelaySamples += this.echoDelayLineL.length;
                if (usesReverb)
                    totalDelaySamples += Config.reverbDelayBufferSize;
                this.flushedSamples += roundedSamplesPerTick;
                if (this.flushedSamples >= totalDelaySamples) {
                    this.deactivateAfterThisTick = true;
                }
            }
            this.eqFilterVolume = eqFilterVolumeStart;
            this.eqFilterVolumeDelta = (eqFilterVolumeEnd - eqFilterVolumeStart) / roundedSamplesPerTick;
            this.delayInputMult = delayInputMultStart;
            this.delayInputMultDelta = (delayInputMultEnd - delayInputMultStart) / roundedSamplesPerTick;
        }
        updateWaves(instrument, samplesPerSecond) {
            this.volumeScale = 1.0;
            if (instrument.type == 0) {
                this.wave = (this.aliases) ? Config.rawChipWaves[instrument.chipWave].samples : Config.chipWaves[instrument.chipWave].samples;
            }
            else if (instrument.type == 8) {
                this.wave = (this.aliases) ? instrument.customChipWave : instrument.customChipWaveIntegral;
                this.volumeScale = 0.05;
            }
            else if (instrument.type == 2) {
                this.wave = getDrumWave(instrument.chipNoise, inverseRealFourierTransform, scaleElementsByFactor);
            }
            else if (instrument.type == 5) {
                this.wave = this.harmonicsWave.getCustomWave(instrument.harmonicsWave, instrument.type);
            }
            else if (instrument.type == 7) {
                this.wave = this.harmonicsWave.getCustomWave(instrument.harmonicsWave, instrument.type);
            }
            else if (instrument.type == 3) {
                this.wave = this.spectrumWave.getCustomWave(instrument.spectrumWave, 8);
            }
            else if (instrument.type == 4) {
                for (let i = 0; i < Config.drumCount; i++) {
                    this.drumsetSpectrumWaves[i].getCustomWave(instrument.drumsetSpectrumWaves[i], InstrumentState._drumsetIndexToSpectrumOctave(i));
                }
                this.wave = null;
            }
            else {
                this.wave = null;
            }
        }
        getDrumsetWave(pitch) {
            if (this.type == 4) {
                return this.drumsetSpectrumWaves[pitch].wave;
            }
            else {
                throw new Error("Unhandled instrument type in getDrumsetWave");
            }
        }
        static drumsetIndexReferenceDelta(index) {
            return Instrument.frequencyFromPitch(Config.spectrumBasePitch + index * 6) / 44100;
        }
        static _drumsetIndexToSpectrumOctave(index) {
            return 15 + Math.log2(InstrumentState.drumsetIndexReferenceDelta(index));
        }
    }
    class ChannelState {
        constructor() {
            this.instruments = [];
            this.muted = false;
            this.singleSeamlessInstrument = null;
        }
    }
    class Synth {
        constructor(song = null) {
            this.samplesPerSecond = 44100;
            this.song = null;
            this.preferLowerLatency = false;
            this.anticipatePoorPerformance = false;
            this.liveInputDuration = 0;
            this.liveInputStarted = false;
            this.liveInputPitches = [];
            this.liveInputChannel = 0;
            this.liveInputInstruments = [];
            this.loopRepeatCount = -1;
            this.volume = 1.0;
            this.enableMetronome = false;
            this.countInMetronome = false;
            this.renderingSong = false;
            this.wantToSkip = false;
            this.playheadInternal = 0.0;
            this.bar = 0;
            this.prevBar = null;
            this.nextBar = null;
            this.beat = 0;
            this.part = 0;
            this.tick = 0;
            this.isAtStartOfTick = true;
            this.isAtEndOfTick = true;
            this.tickSampleCountdown = 0;
            this.modValues = [];
            this.modInsValues = [];
            this.nextModValues = [];
            this.nextModInsValues = [];
            this.isPlayingSong = false;
            this.isRecording = false;
            this.liveInputEndTime = 0.0;
            this.browserAutomaticallyClearsAudioBuffer = true;
            this.tempDrumSetControlPoint = new FilterControlPoint();
            this.tempFrequencyResponse = new FrequencyResponse();
            this.channels = [];
            this.tonePool = new Deque();
            this.tempMatchedPitchTones = Array(Config.maxChordSize).fill(null);
            this.startedMetronome = false;
            this.metronomeSamplesRemaining = -1;
            this.metronomeAmplitude = 0.0;
            this.metronomePrevAmplitude = 0.0;
            this.metronomeFilter = 0.0;
            this.limit = 0.0;
            this.tempMonoInstrumentSampleBuffer = null;
            this.audioCtx = null;
            this.scriptNode = null;
            this.audioProcessCallback = (audioProcessingEvent) => {
                const outputBuffer = audioProcessingEvent.outputBuffer;
                const outputDataL = outputBuffer.getChannelData(0);
                const outputDataR = outputBuffer.getChannelData(1);
                if (this.browserAutomaticallyClearsAudioBuffer && (outputDataL[0] != 0.0 || outputDataR[0] != 0.0 || outputDataL[outputBuffer.length - 1] != 0.0 || outputDataR[outputBuffer.length - 1] != 0.0)) {
                    this.browserAutomaticallyClearsAudioBuffer = false;
                }
                if (!this.browserAutomaticallyClearsAudioBuffer) {
                    const length = outputBuffer.length;
                    for (let i = 0; i < length; i++) {
                        outputDataL[i] = 0.0;
                        outputDataR[i] = 0.0;
                    }
                }
                if (!this.isPlayingSong && performance.now() >= this.liveInputEndTime) {
                    this.deactivateAudio();
                }
                else {
                    this.synthesize(outputDataL, outputDataR, outputBuffer.length, this.isPlayingSong);
                }
            };
            this.computeDelayBufferSizes();
            if (song != null)
                this.setSong(song);
        }
        syncSongState() {
            const channelCount = this.song.getChannelCount();
            for (let i = this.channels.length; i < channelCount; i++) {
                this.channels[i] = new ChannelState();
            }
            this.channels.length = channelCount;
            for (let i = 0; i < channelCount; i++) {
                const channel = this.song.channels[i];
                const channelState = this.channels[i];
                for (let j = channelState.instruments.length; j < channel.instruments.length; j++) {
                    channelState.instruments[j] = new InstrumentState();
                }
                channelState.instruments.length = channel.instruments.length;
                if (channelState.muted != channel.muted) {
                    channelState.muted = channel.muted;
                    if (channelState.muted) {
                        for (const instrumentState of channelState.instruments) {
                            instrumentState.resetAllEffects();
                        }
                    }
                }
            }
        }
        warmUpSynthesizer(song) {
            if (song != null) {
                this.syncSongState();
                const samplesPerTick = this.getSamplesPerTick();
                for (let channelIndex = 0; channelIndex < song.getChannelCount(); channelIndex++) {
                    for (let instrumentIndex = 0; instrumentIndex < song.channels[channelIndex].instruments.length; instrumentIndex++) {
                        const instrument = song.channels[channelIndex].instruments[instrumentIndex];
                        const instrumentState = this.channels[channelIndex].instruments[instrumentIndex];
                        Synth.getInstrumentSynthFunction(instrument);
                        instrument.LFOtime = 0;
                        instrument.nextLFOtime = 0;
                        instrument.arpTime = 0;
                        instrument.tmpEqFilterStart = instrument.eqFilter;
                        instrument.tmpEqFilterEnd = null;
                        instrument.tmpNoteFilterStart = instrument.noteFilter;
                        instrument.tmpNoteFilterEnd = null;
                        instrumentState.updateWaves(instrument, this.samplesPerSecond);
                        instrumentState.allocateNecessaryBuffers(this, instrument, samplesPerTick);
                    }
                }
            }
            var dummyArray = new Float32Array(1);
            this.isPlayingSong = true;
            this.synthesize(dummyArray, dummyArray, 1, true);
            this.isPlayingSong = false;
        }
        computeLatestModValues() {
            if (this.song != null && this.song.modChannelCount > 0) {
                let latestModTimes = [];
                let latestModInsTimes = [];
                this.modValues = [];
                this.nextModValues = [];
                this.modInsValues = [];
                this.nextModInsValues = [];
                for (let channel = 0; channel < this.song.pitchChannelCount + this.song.noiseChannelCount; channel++) {
                    latestModInsTimes[channel] = [];
                    this.modInsValues[channel] = [];
                    this.nextModInsValues[channel] = [];
                    for (let instrument = 0; instrument < this.song.channels[channel].instruments.length; instrument++) {
                        this.modInsValues[channel][instrument] = [];
                        this.nextModInsValues[channel][instrument] = [];
                        latestModInsTimes[channel][instrument] = [];
                    }
                }
                let currentPart = this.beat * Config.partsPerBeat + this.part;
                for (let channelIndex = this.song.pitchChannelCount + this.song.noiseChannelCount; channelIndex < this.song.getChannelCount(); channelIndex++) {
                    if (!(this.song.channels[channelIndex].muted)) {
                        let pattern;
                        for (let currentBar = this.bar; currentBar >= 0; currentBar--) {
                            pattern = this.song.getPattern(channelIndex, currentBar);
                            if (pattern != null) {
                                let instrumentIdx = pattern.instruments[0];
                                let instrument = this.song.channels[channelIndex].instruments[instrumentIdx];
                                let latestPinParts = [];
                                let latestPinValues = [];
                                let partsInBar = (currentBar == this.bar)
                                    ? currentPart
                                    : this.findPartsInBar(currentBar);
                                for (const note of pattern.notes) {
                                    if (note.start < partsInBar && (latestPinParts[Config.modCount - 1 - note.pitches[0]] == null || note.end > latestPinParts[Config.modCount - 1 - note.pitches[0]])) {
                                        if (note.end <= partsInBar) {
                                            latestPinParts[Config.modCount - 1 - note.pitches[0]] = note.end;
                                            latestPinValues[Config.modCount - 1 - note.pitches[0]] = note.pins[note.pins.length - 1].size;
                                        }
                                        else {
                                            latestPinParts[Config.modCount - 1 - note.pitches[0]] = partsInBar;
                                            for (let pinIdx = 0; pinIdx < note.pins.length; pinIdx++) {
                                                if (note.pins[pinIdx].time + note.start > partsInBar) {
                                                    const transitionLength = note.pins[pinIdx].time - note.pins[pinIdx - 1].time;
                                                    const toNextBarLength = partsInBar - note.start - note.pins[pinIdx - 1].time;
                                                    const deltaVolume = note.pins[pinIdx].size - note.pins[pinIdx - 1].size;
                                                    latestPinValues[Config.modCount - 1 - note.pitches[0]] = Math.round(note.pins[pinIdx - 1].size + deltaVolume * toNextBarLength / transitionLength);
                                                    pinIdx = note.pins.length;
                                                }
                                            }
                                        }
                                    }
                                }
                                for (let mod = 0; mod < Config.modCount; mod++) {
                                    if (latestPinParts[mod] != null) {
                                        if (Config.modulators[instrument.modulators[mod]].forSong) {
                                            if (latestModTimes[instrument.modulators[mod]] == null || currentBar * Config.partsPerBeat * this.song.beatsPerBar + latestPinParts[mod] > latestModTimes[instrument.modulators[mod]]) {
                                                this.setModValue(latestPinValues[mod], latestPinValues[mod], mod, instrument.modChannels[mod], instrument.modInstruments[mod], instrument.modulators[mod]);
                                                latestModTimes[instrument.modulators[mod]] = currentBar * Config.partsPerBeat * this.song.beatsPerBar + latestPinParts[mod];
                                            }
                                        }
                                        else {
                                            let usedInstruments = [];
                                            if (instrument.modInstruments[mod] == this.song.channels[instrument.modChannels[mod]].instruments.length) {
                                                for (let i = 0; i < this.song.channels[instrument.modChannels[mod]].instruments.length; i++) {
                                                    usedInstruments.push(i);
                                                }
                                            }
                                            else if (instrument.modInstruments[mod] > this.song.channels[instrument.modChannels[mod]].instruments.length) {
                                                const tgtPattern = this.song.getPattern(instrument.modChannels[mod], currentBar);
                                                if (tgtPattern != null)
                                                    usedInstruments = tgtPattern.instruments;
                                            }
                                            else {
                                                usedInstruments.push(instrument.modInstruments[mod]);
                                            }
                                            for (let instrumentIndex = 0; instrumentIndex < usedInstruments.length; instrumentIndex++) {
                                                const eqFilterParam = instrument.modulators[mod] == Config.modulators.dictionary["eq filter"].index;
                                                const noteFilterParam = instrument.modulators[mod] == Config.modulators.dictionary["note filter"].index;
                                                let modulatorAdjust = instrument.modulators[mod];
                                                if (eqFilterParam) {
                                                    modulatorAdjust = Config.modulators.length + instrument.modFilterTypes[mod];
                                                }
                                                else if (noteFilterParam) {
                                                    modulatorAdjust = Config.modulators.length + 1 + (2 * Config.filterMaxPoints) + instrument.modFilterTypes[mod];
                                                }
                                                if (latestModInsTimes[instrument.modChannels[mod]][usedInstruments[instrumentIndex]][modulatorAdjust] == null
                                                    || currentBar * Config.partsPerBeat * this.song.beatsPerBar + latestPinParts[mod] > latestModInsTimes[instrument.modChannels[mod]][usedInstruments[instrumentIndex]][modulatorAdjust]) {
                                                    if (eqFilterParam) {
                                                        let tgtInstrument = this.song.channels[instrument.modChannels[mod]].instruments[usedInstruments[instrumentIndex]];
                                                        if (instrument.modFilterTypes[mod] == 0) {
                                                            tgtInstrument.tmpEqFilterStart = tgtInstrument.eqSubFilters[latestPinValues[mod]];
                                                        }
                                                        else {
                                                            for (let i = 0; i < Config.filterMorphCount; i++) {
                                                                if (tgtInstrument.tmpEqFilterStart == tgtInstrument.eqSubFilters[i]) {
                                                                    tgtInstrument.tmpEqFilterStart = new FilterSettings();
                                                                    tgtInstrument.tmpEqFilterStart.fromJsonObject(tgtInstrument.eqSubFilters[i].toJsonObject());
                                                                    i = Config.filterMorphCount;
                                                                }
                                                            }
                                                            if (Math.floor((instrument.modFilterTypes[mod] - 1) / 2) < tgtInstrument.tmpEqFilterStart.controlPointCount) {
                                                                if (instrument.modFilterTypes[mod] % 2)
                                                                    tgtInstrument.tmpEqFilterStart.controlPoints[Math.floor((instrument.modFilterTypes[mod] - 1) / 2)].freq = latestPinValues[mod];
                                                                else
                                                                    tgtInstrument.tmpEqFilterStart.controlPoints[Math.floor((instrument.modFilterTypes[mod] - 1) / 2)].gain = latestPinValues[mod];
                                                            }
                                                        }
                                                        tgtInstrument.tmpEqFilterEnd = tgtInstrument.tmpEqFilterStart;
                                                    }
                                                    else if (noteFilterParam) {
                                                        let tgtInstrument = this.song.channels[instrument.modChannels[mod]].instruments[usedInstruments[instrumentIndex]];
                                                        if (instrument.modFilterTypes[mod] == 0) {
                                                            tgtInstrument.tmpNoteFilterStart = tgtInstrument.noteSubFilters[latestPinValues[mod]];
                                                        }
                                                        else {
                                                            for (let i = 0; i < Config.filterMorphCount; i++) {
                                                                if (tgtInstrument.tmpNoteFilterStart == tgtInstrument.noteSubFilters[i]) {
                                                                    tgtInstrument.tmpNoteFilterStart = new FilterSettings();
                                                                    tgtInstrument.tmpNoteFilterStart.fromJsonObject(tgtInstrument.noteSubFilters[i].toJsonObject());
                                                                    i = Config.filterMorphCount;
                                                                }
                                                            }
                                                            if (Math.floor((instrument.modFilterTypes[mod] - 1) / 2) < tgtInstrument.tmpNoteFilterStart.controlPointCount) {
                                                                if (instrument.modFilterTypes[mod] % 2)
                                                                    tgtInstrument.tmpNoteFilterStart.controlPoints[Math.floor((instrument.modFilterTypes[mod] - 1) / 2)].freq = latestPinValues[mod];
                                                                else
                                                                    tgtInstrument.tmpNoteFilterStart.controlPoints[Math.floor((instrument.modFilterTypes[mod] - 1) / 2)].gain = latestPinValues[mod];
                                                            }
                                                        }
                                                        tgtInstrument.tmpNoteFilterEnd = tgtInstrument.tmpNoteFilterStart;
                                                    }
                                                    else
                                                        this.setModValue(latestPinValues[mod], latestPinValues[mod], mod, instrument.modChannels[mod], usedInstruments[instrumentIndex], modulatorAdjust);
                                                    latestModInsTimes[instrument.modChannels[mod]][usedInstruments[instrumentIndex]][modulatorAdjust] = currentBar * Config.partsPerBeat * this.song.beatsPerBar + latestPinParts[mod];
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        determineInvalidModulators(instrument) {
            if (this.song == null)
                return;
            for (let mod = 0; mod < Config.modCount; mod++) {
                instrument.invalidModulators[mod] = true;
                if (instrument.modChannels[mod] == -1) {
                    if (instrument.modulators[mod] != 0)
                        instrument.invalidModulators[mod] = false;
                    continue;
                }
                const channel = this.song.channels[instrument.modChannels[mod]];
                if (channel == null)
                    continue;
                let tgtInstrumentList = [];
                if (instrument.modInstruments[mod] >= channel.instruments.length) {
                    tgtInstrumentList = channel.instruments;
                }
                else {
                    tgtInstrumentList = [channel.instruments[instrument.modInstruments[mod]]];
                }
                for (let i = 0; i < tgtInstrumentList.length; i++) {
                    const tgtInstrument = tgtInstrumentList[i];
                    if (tgtInstrument == null)
                        continue;
                    const str = Config.modulators[instrument.modulators[mod]].name;
                    if (!((Config.modulators[instrument.modulators[mod]].associatedEffect != 12 && !(tgtInstrument.effects & (1 << Config.modulators[instrument.modulators[mod]].associatedEffect)))
                        || (tgtInstrument.type != 1 && (str == "fm slider 1" || str == "fm slider 2" || str == "fm slider 3" || str == "fm slider 4" || str == "fm feedback"))
                        || (tgtInstrument.type != 6 && (str == "pulse width"))
                        || (!tgtInstrument.getChord().arpeggiates && (str == "arp speed" || str == "reset arp"))
                        || (tgtInstrument.eqFilterType && str == "eq filter")
                        || (!tgtInstrument.eqFilterType && (str == "eq filt cut" || str == "eq filt peak"))
                        || (str == "eq filter" && Math.floor((instrument.modFilterTypes[mod] + 1) / 2) > tgtInstrument.eqFilter.controlPointCount)
                        || (tgtInstrument.noteFilterType && str == "note filter")
                        || (!tgtInstrument.noteFilterType && (str == "note filt cut" || str == "note filt peak"))
                        || (str == "note filter" && Math.floor((instrument.modFilterTypes[mod] + 1) / 2) > tgtInstrument.noteFilter.controlPointCount))) {
                        instrument.invalidModulators[mod] = false;
                        i = tgtInstrumentList.length;
                    }
                }
            }
        }
        static operatorAmplitudeCurve(amplitude) {
            return (Math.pow(16.0, amplitude / 15.0) - 1.0) / 15.0;
        }
        get playing() {
            return this.isPlayingSong;
        }
        get recording() {
            return this.isRecording;
        }
        get playhead() {
            return this.playheadInternal;
        }
        set playhead(value) {
            if (this.song != null) {
                this.playheadInternal = Math.max(0, Math.min(this.song.barCount, value));
                let remainder = this.playheadInternal;
                this.bar = Math.floor(remainder);
                remainder = this.song.beatsPerBar * (remainder - this.bar);
                this.beat = Math.floor(remainder);
                remainder = Config.partsPerBeat * (remainder - this.beat);
                this.part = Math.floor(remainder);
                remainder = Config.ticksPerPart * (remainder - this.part);
                this.tick = Math.floor(remainder);
                this.tickSampleCountdown = 0;
                this.isAtStartOfTick = true;
                this.prevBar = null;
            }
        }
        getSamplesPerBar() {
            if (this.song == null)
                throw new Error();
            return this.getSamplesPerTick() * Config.ticksPerPart * Config.partsPerBeat * this.song.beatsPerBar;
        }
        getTicksIntoBar() {
            return (this.beat * Config.partsPerBeat + this.part) * Config.ticksPerPart + this.tick;
        }
        getCurrentPart() {
            return (this.beat * Config.partsPerBeat + this.part);
        }
        findPartsInBar(bar) {
            if (this.song == null)
                return 0;
            let partsInBar = Config.partsPerBeat * this.song.beatsPerBar;
            for (let channel = this.song.pitchChannelCount + this.song.noiseChannelCount; channel < this.song.getChannelCount(); channel++) {
                let pattern = this.song.getPattern(channel, bar);
                if (pattern != null) {
                    let instrument = this.song.channels[channel].instruments[pattern.instruments[0]];
                    for (let mod = 0; mod < Config.modCount; mod++) {
                        if (instrument.modulators[mod] == Config.modulators.dictionary["next bar"].index) {
                            for (const note of pattern.notes) {
                                if (note.pitches[0] == (Config.modCount - 1 - mod)) {
                                    if (partsInBar > note.start)
                                        partsInBar = note.start;
                                }
                            }
                        }
                    }
                }
            }
            return partsInBar;
        }
        getTotalSamples(enableIntro, enableOutro, loop) {
            if (this.song == null)
                return -1;
            let startBar = enableIntro ? 0 : this.song.loopStart;
            let endBar = enableOutro ? this.song.barCount : (this.song.loopStart + this.song.loopLength);
            let hasTempoMods = false;
            let hasNextBarMods = false;
            let prevTempo = this.song.tempo;
            for (let channel = this.song.pitchChannelCount + this.song.noiseChannelCount; channel < this.song.getChannelCount(); channel++) {
                for (let bar = startBar; bar < endBar; bar++) {
                    let pattern = this.song.getPattern(channel, bar);
                    if (pattern != null) {
                        let instrument = this.song.channels[channel].instruments[pattern.instruments[0]];
                        for (let mod = 0; mod < Config.modCount; mod++) {
                            if (instrument.modulators[mod] == Config.modulators.dictionary["tempo"].index) {
                                hasTempoMods = true;
                            }
                            if (instrument.modulators[mod] == Config.modulators.dictionary["next bar"].index) {
                                hasNextBarMods = true;
                            }
                        }
                    }
                }
            }
            if (startBar > 0) {
                let latestTempoPin = null;
                let latestTempoValue = 0;
                for (let bar = startBar - 1; bar >= 0; bar--) {
                    for (let channel = this.song.pitchChannelCount + this.song.noiseChannelCount; channel < this.song.getChannelCount(); channel++) {
                        let pattern = this.song.getPattern(channel, bar);
                        if (pattern != null) {
                            let instrumentIdx = pattern.instruments[0];
                            let instrument = this.song.channels[channel].instruments[instrumentIdx];
                            let partsInBar = this.findPartsInBar(bar);
                            for (const note of pattern.notes) {
                                if (instrument.modulators[Config.modCount - 1 - note.pitches[0]] == Config.modulators.dictionary["tempo"].index) {
                                    if (note.start < partsInBar && (latestTempoPin == null || note.end > latestTempoPin)) {
                                        if (note.end <= partsInBar) {
                                            latestTempoPin = note.end;
                                            latestTempoValue = note.pins[note.pins.length - 1].size;
                                        }
                                        else {
                                            latestTempoPin = partsInBar;
                                            for (let pinIdx = 0; pinIdx < note.pins.length; pinIdx++) {
                                                if (note.pins[pinIdx].time + note.start > partsInBar) {
                                                    const transitionLength = note.pins[pinIdx].time - note.pins[pinIdx - 1].time;
                                                    const toNextBarLength = partsInBar - note.start - note.pins[pinIdx - 1].time;
                                                    const deltaVolume = note.pins[pinIdx].size - note.pins[pinIdx - 1].size;
                                                    latestTempoValue = Math.round(note.pins[pinIdx - 1].size + deltaVolume * toNextBarLength / transitionLength);
                                                    pinIdx = note.pins.length;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (latestTempoPin != null) {
                        prevTempo = latestTempoValue + Config.modulators.dictionary["tempo"].convertRealFactor;
                        bar = -1;
                    }
                }
            }
            if (hasTempoMods || hasNextBarMods) {
                let bar = startBar;
                let ended = false;
                let totalSamples = 0;
                while (!ended) {
                    let partsInBar = Config.partsPerBeat * this.song.beatsPerBar;
                    let currentPart = 0;
                    if (hasNextBarMods) {
                        partsInBar = this.findPartsInBar(bar);
                    }
                    if (hasTempoMods) {
                        let foundMod = false;
                        for (let channel = this.song.pitchChannelCount + this.song.noiseChannelCount; channel < this.song.getChannelCount(); channel++) {
                            if (foundMod == false) {
                                let pattern = this.song.getPattern(channel, bar);
                                if (pattern != null) {
                                    let instrument = this.song.channels[channel].instruments[pattern.instruments[0]];
                                    for (let mod = 0; mod < Config.modCount; mod++) {
                                        if (foundMod == false && instrument.modulators[mod] == Config.modulators.dictionary["tempo"].index
                                            && pattern.notes.find(n => n.pitches[0] == (Config.modCount - 1 - mod))) {
                                            foundMod = true;
                                            pattern.notes.sort(function (a, b) { return (a.start == b.start) ? a.pitches[0] - b.pitches[0] : a.start - b.start; });
                                            for (const note of pattern.notes) {
                                                if (note.pitches[0] == (Config.modCount - 1 - mod)) {
                                                    totalSamples += (Math.min(partsInBar - currentPart, note.start - currentPart)) * Config.ticksPerPart * this.getSamplesPerTickSpecificBPM(prevTempo);
                                                    if (note.start < partsInBar) {
                                                        for (let pinIdx = 1; pinIdx < note.pins.length; pinIdx++) {
                                                            if (note.pins[pinIdx - 1].time + note.start <= partsInBar) {
                                                                const tickLength = Config.ticksPerPart * Math.min(partsInBar - (note.start + note.pins[pinIdx - 1].time), note.pins[pinIdx].time - note.pins[pinIdx - 1].time);
                                                                const prevPinTempo = note.pins[pinIdx - 1].size + Config.modulators.dictionary["tempo"].convertRealFactor;
                                                                let currPinTempo = note.pins[pinIdx].size + Config.modulators.dictionary["tempo"].convertRealFactor;
                                                                if (note.pins[pinIdx].time + note.start > partsInBar) {
                                                                    currPinTempo = note.pins[pinIdx - 1].size + (note.pins[pinIdx].size - note.pins[pinIdx - 1].size) * (partsInBar - (note.start + note.pins[pinIdx - 1].time)) / (note.pins[pinIdx].time - note.pins[pinIdx - 1].time) + Config.modulators.dictionary["tempo"].convertRealFactor;
                                                                }
                                                                let bpmScalar = Config.partsPerBeat * Config.ticksPerPart / 60;
                                                                if (currPinTempo != prevPinTempo) {
                                                                    totalSamples += -this.samplesPerSecond * tickLength * (Math.log(bpmScalar * currPinTempo * tickLength) - Math.log(bpmScalar * prevPinTempo * tickLength)) / (bpmScalar * (prevPinTempo - currPinTempo));
                                                                }
                                                                else {
                                                                    totalSamples += tickLength * this.getSamplesPerTickSpecificBPM(currPinTempo);
                                                                }
                                                                prevTempo = currPinTempo;
                                                            }
                                                            currentPart = Math.min(note.start + note.pins[pinIdx].time, partsInBar);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    totalSamples += (partsInBar - currentPart) * Config.ticksPerPart * this.getSamplesPerTickSpecificBPM(prevTempo);
                    bar++;
                    if (loop != 0 && bar == this.song.loopStart + this.song.loopLength) {
                        bar = this.song.loopStart;
                        if (loop > 0)
                            loop--;
                    }
                    if (bar >= endBar) {
                        ended = true;
                    }
                }
                return Math.ceil(totalSamples);
            }
            else {
                return this.getSamplesPerBar() * this.getTotalBars(enableIntro, enableOutro, loop);
            }
        }
        getTotalBars(enableIntro, enableOutro, useLoopCount = this.loopRepeatCount) {
            if (this.song == null)
                throw new Error();
            let bars = this.song.loopLength * (useLoopCount + 1);
            if (enableIntro)
                bars += this.song.loopStart;
            if (enableOutro)
                bars += this.song.barCount - (this.song.loopStart + this.song.loopLength);
            return bars;
        }
        setSong(song) {
            if (typeof (song) == "string") {
                this.song = new Song(song);
            }
            else if (song instanceof Song) {
                this.song = song;
            }
            this.prevBar = null;
        }
        computeDelayBufferSizes() {
            this.panningDelayBufferSize = Synth.fittingPowerOfTwo(this.samplesPerSecond * Config.panDelaySecondsMax);
            this.panningDelayBufferMask = this.panningDelayBufferSize - 1;
            this.chorusDelayBufferSize = Synth.fittingPowerOfTwo(this.samplesPerSecond * Config.chorusMaxDelay);
            this.chorusDelayBufferMask = this.chorusDelayBufferSize - 1;
        }
        activateAudio() {
            const bufferSize = this.anticipatePoorPerformance ? (this.preferLowerLatency ? 2048 : 4096) : (this.preferLowerLatency ? 512 : 2048);
            if (this.audioCtx == null || this.scriptNode == null || this.scriptNode.bufferSize != bufferSize) {
                if (this.scriptNode != null)
                    this.deactivateAudio();
                const latencyHint = this.anticipatePoorPerformance ? (this.preferLowerLatency ? "balanced" : "playback") : (this.preferLowerLatency ? "interactive" : "balanced");
                this.audioCtx = this.audioCtx || new (window.AudioContext || window.webkitAudioContext)({ latencyHint: latencyHint });
                this.samplesPerSecond = this.audioCtx.sampleRate;
                this.scriptNode = this.audioCtx.createScriptProcessor ? this.audioCtx.createScriptProcessor(bufferSize, 0, 2) : this.audioCtx.createJavaScriptNode(bufferSize, 0, 2);
                this.scriptNode.onaudioprocess = this.audioProcessCallback;
                this.scriptNode.channelCountMode = 'explicit';
                this.scriptNode.channelInterpretation = 'speakers';
                this.scriptNode.connect(this.audioCtx.destination);
                this.computeDelayBufferSizes();
            }
            this.audioCtx.resume();
        }
        deactivateAudio() {
            if (this.audioCtx != null && this.scriptNode != null) {
                this.scriptNode.disconnect(this.audioCtx.destination);
                this.scriptNode = null;
                if (this.audioCtx.close)
                    this.audioCtx.close();
                this.audioCtx = null;
            }
        }
        maintainLiveInput() {
            this.activateAudio();
            this.liveInputEndTime = performance.now() + 10000.0;
        }
        play() {
            if (this.isPlayingSong)
                return;
            this.computeLatestModValues();
            this.warmUpSynthesizer(this.song);
            this.isPlayingSong = true;
            this.activateAudio();
        }
        pause() {
            if (!this.isPlayingSong)
                return;
            this.isPlayingSong = false;
            this.isRecording = false;
            this.modValues = [];
            this.nextModValues = [];
            if (this.song != null) {
                this.song.inVolumeCap = 0.0;
                this.song.outVolumeCap = 0.0;
                for (let channelIndex = 0; channelIndex < this.song.pitchChannelCount + this.song.noiseChannelCount; channelIndex++) {
                    this.modInsValues[channelIndex] = [];
                    this.nextModInsValues[channelIndex] = [];
                }
            }
        }
        startRecording() {
            this.preferLowerLatency = true;
            this.isRecording = true;
            this.play();
        }
        resetEffects() {
            this.limit = 0.0;
            this.freeAllTones();
            if (this.song != null) {
                for (const channelState of this.channels) {
                    for (const instrumentState of channelState.instruments) {
                        instrumentState.resetAllEffects();
                    }
                }
            }
        }
        setModValue(volumeStart, volumeEnd, mod, channelIndex, instrumentIndex, setting) {
            let val = volumeStart + Config.modulators[setting].convertRealFactor;
            let nextVal = volumeEnd + Config.modulators[setting].convertRealFactor;
            if (Config.modulators[setting].forSong) {
                if (this.modValues[setting] == null || this.modValues[setting] != val || this.nextModValues[setting] != nextVal) {
                    this.modValues[setting] = val;
                    this.nextModValues[setting] = nextVal;
                }
            }
            else {
                if (this.modInsValues[channelIndex][instrumentIndex][setting] == null
                    || this.modInsValues[channelIndex][instrumentIndex][setting] != val
                    || this.nextModInsValues[channelIndex][instrumentIndex][setting] != nextVal) {
                    this.modInsValues[channelIndex][instrumentIndex][setting] = val;
                    this.nextModInsValues[channelIndex][instrumentIndex][setting] = nextVal;
                }
            }
            return val;
        }
        getModValue(setting, channel, instrument, nextVal) {
            const forSong = Config.modulators[setting].forSong;
            if (forSong) {
                if (this.modValues[setting] != null && this.nextModValues[setting] != null) {
                    return nextVal ? this.nextModValues[setting] : this.modValues[setting];
                }
            }
            else if (channel != undefined && instrument != undefined) {
                if (this.modInsValues[channel][instrument][setting] != null && this.nextModInsValues[channel][instrument][setting] != null) {
                    return nextVal ? this.nextModInsValues[channel][instrument][setting] : this.modInsValues[channel][instrument][setting];
                }
            }
            return -1;
        }
        isAnyModActive(channel, instrument) {
            for (let setting = 0; setting < Config.modulators.length; setting++) {
                if ((this.modValues != undefined && this.modValues[setting] != null)
                    || (this.modInsValues != undefined && this.modInsValues[channel] != undefined && this.modInsValues[channel][instrument] != undefined && this.modInsValues[channel][instrument][setting] != null)) {
                    return true;
                }
            }
            return false;
        }
        unsetMod(setting, channel, instrument) {
            if (this.isModActive(setting) || (channel != undefined && instrument != undefined && this.isModActive(setting, channel, instrument))) {
                this.modValues[setting] = null;
                this.nextModValues[setting] = null;
                if (channel != undefined && instrument != undefined) {
                    this.modInsValues[channel][instrument][setting] = null;
                    this.nextModInsValues[channel][instrument][setting] = null;
                }
            }
        }
        isFilterModActive(forNoteFilter, channelIdx, instrumentIdx) {
            const instrument = this.song.channels[channelIdx].instruments[instrumentIdx];
            if (forNoteFilter) {
                if (instrument.noteFilterType)
                    return false;
                if (instrument.tmpNoteFilterEnd != null)
                    return true;
            }
            else {
                if (instrument.eqFilterType)
                    return false;
                if (instrument.tmpEqFilterEnd != null)
                    return true;
            }
            return false;
        }
        isModActive(setting, channel, instrument) {
            const forSong = Config.modulators[setting].forSong;
            if (forSong) {
                return (this.modValues != undefined && this.modValues[setting] != null);
            }
            else if (channel != undefined && instrument != undefined && this.modInsValues != undefined && this.modInsValues[channel] != null && this.modInsValues[channel][instrument] != null) {
                return (this.modInsValues[channel][instrument][setting] != null);
            }
            return false;
        }
        snapToStart() {
            this.bar = 0;
            this.resetEffects();
            this.snapToBar();
        }
        goToBar(bar) {
            this.bar = bar;
            this.resetEffects();
            this.playheadInternal = this.bar;
        }
        snapToBar() {
            this.playheadInternal = this.bar;
            this.beat = 0;
            this.part = 0;
            this.tick = 0;
            this.tickSampleCountdown = 0;
        }
        jumpIntoLoop() {
            if (!this.song)
                return;
            if (this.bar < this.song.loopStart || this.bar >= this.song.loopStart + this.song.loopLength) {
                const oldBar = this.bar;
                this.bar = this.song.loopStart;
                this.playheadInternal += this.bar - oldBar;
                if (this.playing)
                    this.computeLatestModValues();
            }
        }
        goToNextBar() {
            if (!this.song)
                return;
            this.prevBar = this.bar;
            const oldBar = this.bar;
            this.bar++;
            if (this.bar >= this.song.barCount) {
                this.bar = 0;
            }
            this.playheadInternal += this.bar - oldBar;
            if (this.playing)
                this.computeLatestModValues();
        }
        goToPrevBar() {
            if (!this.song)
                return;
            this.prevBar = null;
            const oldBar = this.bar;
            this.bar--;
            if (this.bar < 0 || this.bar >= this.song.barCount) {
                this.bar = this.song.barCount - 1;
            }
            this.playheadInternal += this.bar - oldBar;
            if (this.playing)
                this.computeLatestModValues();
        }
        getNextBar() {
            let nextBar = this.bar + 1;
            if (this.isRecording) {
                if (nextBar >= this.song.barCount) {
                    nextBar = this.song.barCount - 1;
                }
            }
            else if (this.loopRepeatCount != 0 && nextBar == this.song.loopStart + this.song.loopLength) {
                nextBar = this.song.loopStart;
            }
            return nextBar;
        }
        skipBar() {
            if (!this.song)
                return;
            const samplesPerTick = this.getSamplesPerTick();
            this.bar++;
            this.beat = 0;
            this.part = 0;
            this.tick = 0;
            this.tickSampleCountdown = samplesPerTick;
            this.isAtStartOfTick = true;
            if (this.loopRepeatCount != 0 && this.bar == this.song.loopStart + this.song.loopLength) {
                this.bar = this.song.loopStart;
                if (this.loopRepeatCount > 0)
                    this.loopRepeatCount--;
            }
        }
        synthesize(outputDataL, outputDataR, outputBufferLength, playSong = true) {
            if (this.song == null) {
                for (let i = 0; i < outputBufferLength; i++) {
                    outputDataL[i] = 0.0;
                    outputDataR[i] = 0.0;
                }
                this.deactivateAudio();
                return;
            }
            const song = this.song;
            this.song.inVolumeCap = 0.0;
            this.song.outVolumeCap = 0.0;
            let samplesPerTick = this.getSamplesPerTick();
            let ended = false;
            if (this.tickSampleCountdown <= 0 || this.tickSampleCountdown > samplesPerTick) {
                this.tickSampleCountdown = samplesPerTick;
                this.isAtStartOfTick = true;
            }
            if (playSong) {
                if (this.beat >= song.beatsPerBar) {
                    this.beat = 0;
                    this.part = 0;
                    this.tick = 0;
                    this.tickSampleCountdown = samplesPerTick;
                    this.isAtStartOfTick = true;
                    this.prevBar = this.bar;
                    this.bar = this.getNextBar();
                    if (this.bar <= this.prevBar && this.loopRepeatCount > 0)
                        this.loopRepeatCount--;
                }
                if (this.bar >= song.barCount) {
                    this.bar = 0;
                    if (this.loopRepeatCount != -1) {
                        ended = true;
                        this.pause();
                    }
                }
            }
            this.syncSongState();
            if (this.tempMonoInstrumentSampleBuffer == null || this.tempMonoInstrumentSampleBuffer.length < outputBufferLength) {
                this.tempMonoInstrumentSampleBuffer = new Float32Array(outputBufferLength);
            }
            const volume = +this.volume;
            const limitDecay = 1.0 - Math.pow(0.5, 4.0 / this.samplesPerSecond);
            const limitRise = 1.0 - Math.pow(0.5, 4000.0 / this.samplesPerSecond);
            let limit = +this.limit;
            let skippedBars = [];
            let firstSkippedBufferIndex = -1;
            let bufferIndex = 0;
            while (bufferIndex < outputBufferLength && !ended) {
                this.nextBar = this.getNextBar();
                if (this.nextBar >= song.barCount)
                    this.nextBar = null;
                const samplesLeftInBuffer = outputBufferLength - bufferIndex;
                const samplesLeftInTick = Math.ceil(this.tickSampleCountdown);
                const runLength = Math.min(samplesLeftInTick, samplesLeftInBuffer);
                const runEnd = bufferIndex + runLength;
                if (this.isPlayingSong || this.renderingSong) {
                    for (let channelIndex = song.pitchChannelCount + song.noiseChannelCount; channelIndex < song.getChannelCount(); channelIndex++) {
                        const channel = song.channels[channelIndex];
                        const channelState = this.channels[channelIndex];
                        this.determineCurrentActiveTones(song, channelIndex, samplesPerTick, playSong);
                        for (let instrumentIndex = 0; instrumentIndex < channel.instruments.length; instrumentIndex++) {
                            const instrumentState = channelState.instruments[instrumentIndex];
                            for (let i = 0; i < instrumentState.activeModTones.count(); i++) {
                                const tone = instrumentState.activeModTones.get(i);
                                this.playModTone(song, channelIndex, samplesPerTick, bufferIndex, runLength, tone, false, false);
                            }
                        }
                    }
                }
                if (this.wantToSkip) {
                    let barVisited = skippedBars.includes(this.bar);
                    if (barVisited && bufferIndex == firstSkippedBufferIndex)
                        return;
                    if (firstSkippedBufferIndex == -1) {
                        firstSkippedBufferIndex = bufferIndex;
                    }
                    if (!barVisited)
                        skippedBars.push(this.bar);
                    this.wantToSkip = false;
                    this.skipBar();
                    continue;
                }
                for (let channelIndex = 0; channelIndex < song.pitchChannelCount + song.noiseChannelCount; channelIndex++) {
                    const channel = song.channels[channelIndex];
                    const channelState = this.channels[channelIndex];
                    if (this.isAtStartOfTick) {
                        this.determineCurrentActiveTones(song, channelIndex, samplesPerTick, playSong && !this.countInMetronome);
                        this.determineLiveInputTones(song, channelIndex, samplesPerTick);
                    }
                    for (let instrumentIndex = 0; instrumentIndex < channel.instruments.length; instrumentIndex++) {
                        const instrument = channel.instruments[instrumentIndex];
                        const instrumentState = channelState.instruments[instrumentIndex];
                        if (this.isAtStartOfTick) {
                            let tonesPlayedInThisInstrument = instrumentState.activeTones.count() + instrumentState.liveInputTones.count();
                            for (let i = 0; i < instrumentState.releasedTones.count(); i++) {
                                const tone = instrumentState.releasedTones.get(i);
                                if (tone.ticksSinceReleased >= Math.abs(instrument.getFadeOutTicks())) {
                                    this.freeReleasedTone(instrumentState, i);
                                    i--;
                                    continue;
                                }
                                const shouldFadeOutFast = (tonesPlayedInThisInstrument >= Config.maximumTonesPerChannel);
                                this.computeTone(song, channelIndex, samplesPerTick, tone, true, shouldFadeOutFast);
                                tonesPlayedInThisInstrument++;
                            }
                            if (instrumentState.awake) {
                                if (!instrumentState.computed) {
                                    instrumentState.compute(this, instrument, samplesPerTick, Math.ceil(samplesPerTick), null, channelIndex, instrumentIndex);
                                }
                                instrumentState.computed = false;
                            }
                        }
                        for (let i = 0; i < instrumentState.activeTones.count(); i++) {
                            const tone = instrumentState.activeTones.get(i);
                            this.playTone(channelIndex, bufferIndex, runLength, tone);
                        }
                        for (let i = 0; i < instrumentState.liveInputTones.count(); i++) {
                            const tone = instrumentState.liveInputTones.get(i);
                            this.playTone(channelIndex, bufferIndex, runLength, tone);
                        }
                        for (let i = 0; i < instrumentState.releasedTones.count(); i++) {
                            const tone = instrumentState.releasedTones.get(i);
                            this.playTone(channelIndex, bufferIndex, runLength, tone);
                        }
                        if (instrumentState.awake) {
                            Synth.effectsSynth(this, outputDataL, outputDataR, bufferIndex, runLength, instrumentState);
                        }
                        const tickSampleCountdown = this.tickSampleCountdown;
                        const startRatio = 1.0 - (tickSampleCountdown) / samplesPerTick;
                        const endRatio = 1.0 - (tickSampleCountdown - runLength) / samplesPerTick;
                        const ticksIntoBar = (this.beat * Config.partsPerBeat + this.part) * Config.ticksPerPart + this.tick;
                        const partTimeTickStart = (ticksIntoBar) / Config.ticksPerPart;
                        const partTimeTickEnd = (ticksIntoBar + 1) / Config.ticksPerPart;
                        const partTimeStart = partTimeTickStart + (partTimeTickEnd - partTimeTickStart) * startRatio;
                        const partTimeEnd = partTimeTickStart + (partTimeTickEnd - partTimeTickStart) * endRatio;
                        let useVibratoSpeed = instrument.vibratoSpeed;
                        instrument.LFOtime = instrument.nextLFOtime;
                        if (this.isModActive(Config.modulators.dictionary["vibrato speed"].index, channelIndex, instrumentIndex)) {
                            useVibratoSpeed = this.getModValue(Config.modulators.dictionary["vibrato speed"].index, channelIndex, instrumentIndex);
                        }
                        if (useVibratoSpeed == 0) {
                            instrument.LFOtime = 0;
                            instrument.nextLFOtime = 0;
                        }
                        else {
                            instrument.nextLFOtime += useVibratoSpeed * 0.1 * (partTimeEnd - partTimeStart);
                        }
                    }
                }
                if (this.enableMetronome || this.countInMetronome) {
                    if (this.part == 0) {
                        if (!this.startedMetronome) {
                            const midBeat = (song.beatsPerBar > 4 && (song.beatsPerBar % 2 == 0) && this.beat == song.beatsPerBar / 2);
                            const periods = (this.beat == 0) ? 8 : midBeat ? 6 : 4;
                            const hz = (this.beat == 0) ? 1600 : midBeat ? 1200 : 800;
                            const amplitude = (this.beat == 0) ? 0.06 : midBeat ? 0.05 : 0.04;
                            const samplesPerPeriod = this.samplesPerSecond / hz;
                            const radiansPerSample = Math.PI * 2.0 / samplesPerPeriod;
                            this.metronomeSamplesRemaining = Math.floor(samplesPerPeriod * periods);
                            this.metronomeFilter = 2.0 * Math.cos(radiansPerSample);
                            this.metronomeAmplitude = amplitude * Math.sin(radiansPerSample);
                            this.metronomePrevAmplitude = 0.0;
                            this.startedMetronome = true;
                        }
                        if (this.metronomeSamplesRemaining > 0) {
                            const stopIndex = Math.min(runEnd, bufferIndex + this.metronomeSamplesRemaining);
                            this.metronomeSamplesRemaining -= stopIndex - bufferIndex;
                            for (let i = bufferIndex; i < stopIndex; i++) {
                                outputDataL[i] += this.metronomeAmplitude;
                                outputDataR[i] += this.metronomeAmplitude;
                                const tempAmplitude = this.metronomeFilter * this.metronomeAmplitude - this.metronomePrevAmplitude;
                                this.metronomePrevAmplitude = this.metronomeAmplitude;
                                this.metronomeAmplitude = tempAmplitude;
                            }
                        }
                    }
                    else {
                        this.startedMetronome = false;
                    }
                }
                for (let i = bufferIndex; i < runEnd; i++) {
                    const sampleL = outputDataL[i] * song.masterGain * song.masterGain;
                    const sampleR = outputDataR[i] * song.masterGain * song.masterGain;
                    const absL = sampleL < 0.0 ? -sampleL : sampleL;
                    const absR = sampleR < 0.0 ? -sampleR : sampleR;
                    const abs = absL > absR ? absL : absR;
                    this.song.inVolumeCap = (this.song.inVolumeCap > abs ? this.song.inVolumeCap : abs);
                    const limitRange = (+(abs > song.compressionThreshold)) + (+(abs > song.limitThreshold));
                    const limitTarget = (+(limitRange == 0)) * (((abs + 1 - song.compressionThreshold) * 0.8 + 0.25) * song.compressionRatio + 1.05 * (1 - song.compressionRatio))
                        + (+(limitRange == 1)) * (1.05)
                        + (+(limitRange == 2)) * (1.05 * ((abs + 1 - song.limitThreshold) * song.limitRatio + (1 - song.limitThreshold)));
                    limit += ((limitTarget - limit) * (limit < limitTarget ? limitRise : limitDecay));
                    const limitedVolume = volume / (limit >= 1 ? limit * 1.05 : limit * 0.8 + 0.25);
                    outputDataL[i] = sampleL * limitedVolume;
                    outputDataR[i] = sampleR * limitedVolume;
                    this.song.outVolumeCap = (this.song.outVolumeCap > abs * limitedVolume ? this.song.outVolumeCap : abs * limitedVolume);
                }
                bufferIndex += runLength;
                this.isAtStartOfTick = false;
                this.tickSampleCountdown -= runLength;
                if (this.tickSampleCountdown <= 0) {
                    this.isAtStartOfTick = true;
                    for (const channelState of this.channels) {
                        for (const instrumentState of channelState.instruments) {
                            for (let i = 0; i < instrumentState.releasedTones.count(); i++) {
                                const tone = instrumentState.releasedTones.get(i);
                                if (tone.isOnLastTick) {
                                    this.freeReleasedTone(instrumentState, i);
                                    i--;
                                }
                                else {
                                    tone.ticksSinceReleased++;
                                }
                            }
                            if (instrumentState.deactivateAfterThisTick) {
                                instrumentState.deactivate();
                            }
                            instrumentState.tonesAddedInThisTick = false;
                        }
                    }
                    for (let channel = 0; channel < this.song.pitchChannelCount + this.song.noiseChannelCount; channel++) {
                        for (let instrumentIdx = 0; instrumentIdx < this.song.channels[channel].instruments.length; instrumentIdx++) {
                            let instrument = this.song.channels[channel].instruments[instrumentIdx];
                            let useArpeggioSpeed = instrument.arpeggioSpeed;
                            if (this.isModActive(Config.modulators.dictionary["arp speed"].index, channel, instrumentIdx)) {
                                useArpeggioSpeed = this.getModValue(Config.modulators.dictionary["arp speed"].index, channel, instrumentIdx, false);
                                if (Number.isInteger(useArpeggioSpeed)) {
                                    instrument.arpTime += Config.arpSpeedScale[useArpeggioSpeed];
                                }
                                else {
                                    instrument.arpTime += (1 - (useArpeggioSpeed % 1)) * Config.arpSpeedScale[Math.floor(useArpeggioSpeed)] + (useArpeggioSpeed % 1) * Config.arpSpeedScale[Math.ceil(useArpeggioSpeed)];
                                }
                            }
                            else {
                                instrument.arpTime += Config.arpSpeedScale[useArpeggioSpeed];
                            }
                        }
                    }
                    for (let channel = 0; channel < this.song.pitchChannelCount + this.song.noiseChannelCount; channel++) {
                        for (let instrumentIdx = 0; instrumentIdx < this.song.channels[channel].instruments.length; instrumentIdx++) {
                            let instrument = this.song.channels[channel].instruments[instrumentIdx];
                            if (instrument.tmpEqFilterEnd != null) {
                                instrument.tmpEqFilterStart = instrument.tmpEqFilterEnd;
                            }
                            else {
                                instrument.tmpEqFilterStart = instrument.eqFilter;
                            }
                            if (instrument.tmpNoteFilterEnd != null) {
                                instrument.tmpNoteFilterStart = instrument.tmpNoteFilterEnd;
                            }
                            else {
                                instrument.tmpNoteFilterStart = instrument.noteFilter;
                            }
                        }
                    }
                    this.tick++;
                    this.tickSampleCountdown += samplesPerTick;
                    if (this.tick == Config.ticksPerPart) {
                        this.tick = 0;
                        this.part++;
                        this.liveInputDuration--;
                        if (this.part == Config.partsPerBeat) {
                            this.part = 0;
                            if (playSong) {
                                this.beat++;
                                if (this.beat == song.beatsPerBar) {
                                    this.beat = 0;
                                    if (this.countInMetronome) {
                                        this.countInMetronome = false;
                                    }
                                    else {
                                        this.prevBar = this.bar;
                                        this.bar = this.getNextBar();
                                        if (this.bar <= this.prevBar && this.loopRepeatCount > 0)
                                            this.loopRepeatCount--;
                                        if (this.bar >= song.barCount) {
                                            this.bar = 0;
                                            if (this.loopRepeatCount != -1) {
                                                ended = true;
                                                this.resetEffects();
                                                this.pause();
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                for (let setting = 0; setting < Config.modulators.length; setting++) {
                    if (this.nextModValues != null && this.nextModValues[setting] != null)
                        this.modValues[setting] = this.nextModValues[setting];
                }
                if (this.isModActive(Config.modulators.dictionary["tempo"].index)) {
                    samplesPerTick = this.getSamplesPerTick();
                    this.tickSampleCountdown = Math.min(this.tickSampleCountdown, samplesPerTick);
                }
                for (let channel = 0; channel < this.song.pitchChannelCount; channel++) {
                    for (let instrument of this.song.channels[channel].instruments) {
                        instrument.nextLFOtime = (instrument.nextLFOtime % (Config.vibratoTypes[instrument.vibratoType].period / (Config.ticksPerPart * samplesPerTick / this.samplesPerSecond)));
                        instrument.arpTime = (instrument.arpTime % (2520 * Config.ticksPerArpeggio));
                    }
                }
                for (let setting = 0; setting < Config.modulators.length; setting++) {
                    for (let channel = 0; channel < this.song.pitchChannelCount + this.song.noiseChannelCount; channel++) {
                        for (let instrument = 0; instrument < this.song.getMaxInstrumentsPerChannel(); instrument++) {
                            if (this.nextModInsValues != null && this.nextModInsValues[channel] != null && this.nextModInsValues[channel][instrument] != null && this.nextModInsValues[channel][instrument][setting] != null) {
                                this.modInsValues[channel][instrument][setting] = this.nextModInsValues[channel][instrument][setting];
                            }
                        }
                    }
                }
            }
            if (!Number.isFinite(limit) || Math.abs(limit) < epsilon)
                limit = 0.0;
            this.limit = limit;
            if (playSong && !this.countInMetronome) {
                this.playheadInternal = (((this.tick + 1.0 - this.tickSampleCountdown / samplesPerTick) / 2.0 + this.part) / Config.partsPerBeat + this.beat) / song.beatsPerBar + this.bar;
            }
        }
        freeTone(tone) {
            this.tonePool.pushBack(tone);
        }
        newTone() {
            if (this.tonePool.count() > 0) {
                const tone = this.tonePool.popBack();
                tone.freshlyAllocated = true;
                return tone;
            }
            return new Tone();
        }
        releaseTone(instrumentState, tone) {
            instrumentState.releasedTones.pushFront(tone);
            tone.atNoteStart = false;
            tone.passedEndOfNote = true;
        }
        freeReleasedTone(instrumentState, toneIndex) {
            this.freeTone(instrumentState.releasedTones.get(toneIndex));
            instrumentState.releasedTones.remove(toneIndex);
        }
        freeAllTones() {
            for (const channelState of this.channels) {
                for (const instrumentState of channelState.instruments) {
                    while (instrumentState.activeTones.count() > 0)
                        this.freeTone(instrumentState.activeTones.popBack());
                    while (instrumentState.activeModTones.count() > 0)
                        this.freeTone(instrumentState.activeModTones.popBack());
                    while (instrumentState.releasedTones.count() > 0)
                        this.freeTone(instrumentState.releasedTones.popBack());
                    while (instrumentState.liveInputTones.count() > 0)
                        this.freeTone(instrumentState.liveInputTones.popBack());
                }
            }
        }
        determineLiveInputTones(song, channelIndex, samplesPerTick) {
            const channel = song.channels[channelIndex];
            const channelState = this.channels[channelIndex];
            const pitches = this.liveInputPitches;
            for (let instrumentIndex = 0; instrumentIndex < channel.instruments.length; instrumentIndex++) {
                const instrumentState = channelState.instruments[instrumentIndex];
                const toneList = instrumentState.liveInputTones;
                let toneCount = 0;
                if (this.liveInputDuration > 0 && channelIndex == this.liveInputChannel && pitches.length > 0 && this.liveInputInstruments.indexOf(instrumentIndex) != -1) {
                    const instrument = channel.instruments[instrumentIndex];
                    if (instrument.getChord().singleTone) {
                        let tone;
                        if (toneList.count() <= toneCount) {
                            tone = this.newTone();
                            toneList.pushBack(tone);
                        }
                        else if (!instrument.getTransition().isSeamless && this.liveInputStarted) {
                            this.releaseTone(instrumentState, toneList.get(toneCount));
                            tone = this.newTone();
                            toneList.set(toneCount, tone);
                        }
                        else {
                            tone = toneList.get(toneCount);
                        }
                        toneCount++;
                        for (let i = 0; i < pitches.length; i++) {
                            tone.pitches[i] = pitches[i];
                        }
                        tone.pitchCount = pitches.length;
                        tone.chordSize = 1;
                        tone.instrumentIndex = instrumentIndex;
                        tone.note = tone.prevNote = tone.nextNote = null;
                        tone.atNoteStart = this.liveInputStarted;
                        tone.forceContinueAtStart = false;
                        tone.forceContinueAtEnd = false;
                        this.computeTone(song, channelIndex, samplesPerTick, tone, false, false);
                    }
                    else {
                        this.moveTonesIntoOrderedTempMatchedList(toneList, pitches);
                        for (let i = 0; i < pitches.length; i++) {
                            let tone;
                            if (this.tempMatchedPitchTones[toneCount] != null) {
                                tone = this.tempMatchedPitchTones[toneCount];
                                this.tempMatchedPitchTones[toneCount] = null;
                                if (tone.pitchCount != 1 || tone.pitches[0] != pitches[i]) {
                                    this.releaseTone(instrumentState, tone);
                                    tone = this.newTone();
                                }
                                toneList.pushBack(tone);
                            }
                            else {
                                tone = this.newTone();
                                toneList.pushBack(tone);
                            }
                            toneCount++;
                            tone.pitches[0] = pitches[i];
                            tone.pitchCount = 1;
                            tone.chordSize = pitches.length;
                            tone.instrumentIndex = instrumentIndex;
                            tone.note = tone.prevNote = tone.nextNote = null;
                            tone.atNoteStart = this.liveInputStarted;
                            tone.forceContinueAtStart = false;
                            tone.forceContinueAtEnd = false;
                            this.computeTone(song, channelIndex, samplesPerTick, tone, false, false);
                        }
                    }
                }
                while (toneList.count() > toneCount) {
                    this.releaseTone(instrumentState, toneList.popBack());
                }
                this.clearTempMatchedPitchTones(toneCount, instrumentState);
            }
            this.liveInputStarted = false;
        }
        adjacentPatternHasCompatibleInstrumentTransition(song, channel, pattern, otherPattern, instrumentIndex, transition, chord, note, otherNote, forceContinue) {
            if (song.patternInstruments && otherPattern.instruments.indexOf(instrumentIndex) == -1) {
                if (pattern.instruments.length > 1 || otherPattern.instruments.length > 1) {
                    return null;
                }
                const otherInstrument = channel.instruments[otherPattern.instruments[0]];
                if (forceContinue) {
                    return otherInstrument.getChord();
                }
                const otherTransition = otherInstrument.getTransition();
                if (transition.includeAdjacentPatterns && otherTransition.includeAdjacentPatterns && otherTransition.slides == transition.slides) {
                    return otherInstrument.getChord();
                }
                else {
                    return null;
                }
            }
            else {
                return (forceContinue || transition.includeAdjacentPatterns) ? chord : null;
            }
        }
        static adjacentNotesHaveMatchingPitches(firstNote, secondNote) {
            if (firstNote.pitches.length != secondNote.pitches.length)
                return false;
            const firstNoteInterval = firstNote.pins[firstNote.pins.length - 1].interval;
            for (const pitch of firstNote.pitches) {
                if (secondNote.pitches.indexOf(pitch + firstNoteInterval) == -1)
                    return false;
            }
            return true;
        }
        moveTonesIntoOrderedTempMatchedList(toneList, notePitches) {
            for (let i = 0; i < toneList.count(); i++) {
                const tone = toneList.get(i);
                const pitch = tone.pitches[0] + tone.lastInterval;
                for (let j = 0; j < notePitches.length; j++) {
                    if (notePitches[j] == pitch) {
                        this.tempMatchedPitchTones[j] = tone;
                        toneList.remove(i);
                        i--;
                        break;
                    }
                }
            }
            while (toneList.count() > 0) {
                const tone = toneList.popFront();
                for (let j = 0; j < this.tempMatchedPitchTones.length; j++) {
                    if (this.tempMatchedPitchTones[j] == null) {
                        this.tempMatchedPitchTones[j] = tone;
                        break;
                    }
                }
            }
        }
        determineCurrentActiveTones(song, channelIndex, samplesPerTick, playSong) {
            const channel = song.channels[channelIndex];
            const channelState = this.channels[channelIndex];
            const pattern = song.getPattern(channelIndex, this.bar);
            const currentPart = this.getCurrentPart();
            const currentTick = this.tick + Config.ticksPerPart * currentPart;
            if (playSong && song.getChannelIsMod(channelIndex)) {
                let notes = [];
                let prevNotes = [];
                let nextNotes = [];
                let fillCount = Config.modCount;
                while (fillCount--) {
                    notes.push(null);
                    prevNotes.push(null);
                    nextNotes.push(null);
                }
                if (pattern != null && !channel.muted) {
                    for (let i = 0; i < pattern.notes.length; i++) {
                        if (pattern.notes[i].end <= currentPart) {
                            if (prevNotes[pattern.notes[i].pitches[0]] == null || pattern.notes[i].end > prevNotes[pattern.notes[i].pitches[0]].start) {
                                prevNotes[pattern.notes[i].pitches[0]] = pattern.notes[i];
                            }
                        }
                        else if (pattern.notes[i].start <= currentPart && pattern.notes[i].end > currentPart) {
                            notes[pattern.notes[i].pitches[0]] = pattern.notes[i];
                        }
                        else if (pattern.notes[i].start > currentPart) {
                            if (nextNotes[pattern.notes[i].pitches[0]] == null || pattern.notes[i].start < nextNotes[pattern.notes[i].pitches[0]].start) {
                                nextNotes[pattern.notes[i].pitches[0]] = pattern.notes[i];
                            }
                        }
                    }
                }
                let modToneCount = 0;
                const newInstrumentIndex = (song.patternInstruments && (pattern != null)) ? pattern.instruments[0] : 0;
                const instrumentState = channelState.instruments[newInstrumentIndex];
                const toneList = instrumentState.activeModTones;
                for (let mod = 0; mod < Config.modCount; mod++) {
                    if (notes[mod] != null) {
                        if (prevNotes[mod] != null && prevNotes[mod].end != notes[mod].start)
                            prevNotes[mod] = null;
                        if (nextNotes[mod] != null && nextNotes[mod].start != notes[mod].end)
                            nextNotes[mod] = null;
                    }
                    if (channelState.singleSeamlessInstrument != null && channelState.singleSeamlessInstrument != newInstrumentIndex && channelState.singleSeamlessInstrument < channelState.instruments.length) {
                        const sourceInstrumentState = channelState.instruments[channelState.singleSeamlessInstrument];
                        const destInstrumentState = channelState.instruments[newInstrumentIndex];
                        while (sourceInstrumentState.activeModTones.count() > 0) {
                            destInstrumentState.activeModTones.pushFront(sourceInstrumentState.activeModTones.popBack());
                        }
                    }
                    channelState.singleSeamlessInstrument = newInstrumentIndex;
                    if (notes[mod] != null) {
                        let prevNoteForThisInstrument = prevNotes[mod];
                        let nextNoteForThisInstrument = nextNotes[mod];
                        let forceContinueAtStart = false;
                        let forceContinueAtEnd = false;
                        const atNoteStart = (Config.ticksPerPart * notes[mod].start == currentTick) && this.isAtStartOfTick;
                        let tone;
                        if (toneList.count() <= modToneCount) {
                            tone = this.newTone();
                            toneList.pushBack(tone);
                        }
                        else if (atNoteStart && (prevNoteForThisInstrument == null)) {
                            const oldTone = toneList.get(modToneCount);
                            if (oldTone.isOnLastTick) {
                                this.freeTone(oldTone);
                            }
                            else {
                                this.releaseTone(instrumentState, oldTone);
                            }
                            tone = this.newTone();
                            toneList.set(modToneCount, tone);
                        }
                        else {
                            tone = toneList.get(modToneCount);
                        }
                        modToneCount++;
                        for (let i = 0; i < notes[mod].pitches.length; i++) {
                            tone.pitches[i] = notes[mod].pitches[i];
                        }
                        tone.pitchCount = notes[mod].pitches.length;
                        tone.chordSize = 1;
                        tone.instrumentIndex = newInstrumentIndex;
                        tone.note = notes[mod];
                        tone.noteStartPart = notes[mod].start;
                        tone.noteEndPart = notes[mod].end;
                        tone.prevNote = prevNoteForThisInstrument;
                        tone.nextNote = nextNoteForThisInstrument;
                        tone.prevNotePitchIndex = 0;
                        tone.nextNotePitchIndex = 0;
                        tone.atNoteStart = atNoteStart;
                        tone.passedEndOfNote = false;
                        tone.forceContinueAtStart = forceContinueAtStart;
                        tone.forceContinueAtEnd = forceContinueAtEnd;
                    }
                }
                while (toneList.count() > modToneCount) {
                    const tone = toneList.popBack();
                    const channel = song.channels[channelIndex];
                    if (tone.instrumentIndex < channel.instruments.length && !tone.isOnLastTick) {
                        const instrumentState = this.channels[channelIndex].instruments[tone.instrumentIndex];
                        this.releaseTone(instrumentState, tone);
                    }
                    else {
                        this.freeTone(tone);
                    }
                }
            }
            else if (!song.getChannelIsMod(channelIndex)) {
                let note = null;
                let prevNote = null;
                let nextNote = null;
                if (playSong && pattern != null && !channel.muted && (!this.isRecording || this.liveInputChannel != channelIndex)) {
                    for (let i = 0; i < pattern.notes.length; i++) {
                        if (pattern.notes[i].end <= currentPart) {
                            prevNote = pattern.notes[i];
                        }
                        else if (pattern.notes[i].start <= currentPart && pattern.notes[i].end > currentPart) {
                            note = pattern.notes[i];
                        }
                        else if (pattern.notes[i].start > currentPart) {
                            nextNote = pattern.notes[i];
                            break;
                        }
                    }
                    if (note != null) {
                        if (prevNote != null && prevNote.end != note.start)
                            prevNote = null;
                        if (nextNote != null && nextNote.start != note.end)
                            nextNote = null;
                    }
                }
                if (pattern != null && (!song.layeredInstruments || channel.instruments.length == 1 || (song.patternInstruments && pattern.instruments.length == 1))) {
                    const newInstrumentIndex = song.patternInstruments ? pattern.instruments[0] : 0;
                    if (channelState.singleSeamlessInstrument != null && channelState.singleSeamlessInstrument != newInstrumentIndex && channelState.singleSeamlessInstrument < channelState.instruments.length) {
                        const sourceInstrumentState = channelState.instruments[channelState.singleSeamlessInstrument];
                        const destInstrumentState = channelState.instruments[newInstrumentIndex];
                        while (sourceInstrumentState.activeTones.count() > 0) {
                            destInstrumentState.activeTones.pushFront(sourceInstrumentState.activeTones.popBack());
                        }
                    }
                    channelState.singleSeamlessInstrument = newInstrumentIndex;
                }
                else {
                    channelState.singleSeamlessInstrument = null;
                }
                for (let instrumentIndex = 0; instrumentIndex < channel.instruments.length; instrumentIndex++) {
                    const instrumentState = channelState.instruments[instrumentIndex];
                    const toneList = instrumentState.activeTones;
                    let toneCount = 0;
                    if ((note != null) && (!song.patternInstruments || (pattern.instruments.indexOf(instrumentIndex) != -1))) {
                        const instrument = channel.instruments[instrumentIndex];
                        let prevNoteForThisInstrument = prevNote;
                        let nextNoteForThisInstrument = nextNote;
                        const partsPerBar = Config.partsPerBeat * song.beatsPerBar;
                        const transition = instrument.getTransition();
                        const chord = instrument.getChord();
                        let forceContinueAtStart = false;
                        let forceContinueAtEnd = false;
                        let tonesInPrevNote = 0;
                        let tonesInNextNote = 0;
                        if (note.start == 0) {
                            let prevPattern = (this.prevBar == null) ? null : song.getPattern(channelIndex, this.prevBar);
                            if (prevPattern != null) {
                                const lastNote = (prevPattern.notes.length <= 0) ? null : prevPattern.notes[prevPattern.notes.length - 1];
                                if (lastNote != null && lastNote.end == partsPerBar) {
                                    const patternForcesContinueAtStart = note.continuesLastPattern && Synth.adjacentNotesHaveMatchingPitches(lastNote, note);
                                    const chordOfCompatibleInstrument = this.adjacentPatternHasCompatibleInstrumentTransition(song, channel, pattern, prevPattern, instrumentIndex, transition, chord, note, lastNote, patternForcesContinueAtStart);
                                    if (chordOfCompatibleInstrument != null) {
                                        prevNoteForThisInstrument = lastNote;
                                        tonesInPrevNote = chordOfCompatibleInstrument.singleTone ? 1 : prevNoteForThisInstrument.pitches.length;
                                        forceContinueAtStart = patternForcesContinueAtStart;
                                    }
                                }
                            }
                        }
                        else if (prevNoteForThisInstrument != null) {
                            tonesInPrevNote = chord.singleTone ? 1 : prevNoteForThisInstrument.pitches.length;
                        }
                        if (note.end == partsPerBar) {
                            let nextPattern = (this.nextBar == null) ? null : song.getPattern(channelIndex, this.nextBar);
                            if (nextPattern != null) {
                                const firstNote = (nextPattern.notes.length <= 0) ? null : nextPattern.notes[0];
                                if (firstNote != null && firstNote.start == 0) {
                                    const nextPatternForcesContinueAtStart = firstNote.continuesLastPattern && Synth.adjacentNotesHaveMatchingPitches(note, firstNote);
                                    const chordOfCompatibleInstrument = this.adjacentPatternHasCompatibleInstrumentTransition(song, channel, pattern, nextPattern, instrumentIndex, transition, chord, note, firstNote, nextPatternForcesContinueAtStart);
                                    if (chordOfCompatibleInstrument != null) {
                                        nextNoteForThisInstrument = firstNote;
                                        tonesInNextNote = chordOfCompatibleInstrument.singleTone ? 1 : nextNoteForThisInstrument.pitches.length;
                                        forceContinueAtEnd = nextPatternForcesContinueAtStart;
                                    }
                                }
                            }
                        }
                        else if (nextNoteForThisInstrument != null) {
                            tonesInNextNote = chord.singleTone ? 1 : nextNoteForThisInstrument.pitches.length;
                        }
                        if (chord.singleTone) {
                            const atNoteStart = (Config.ticksPerPart * note.start == currentTick);
                            let tone;
                            if (toneList.count() <= toneCount) {
                                tone = this.newTone();
                                toneList.pushBack(tone);
                            }
                            else if (atNoteStart && ((!(transition.isSeamless || instrument.clicklessTransition) && !forceContinueAtStart) || prevNoteForThisInstrument == null)) {
                                const oldTone = toneList.get(toneCount);
                                if (oldTone.isOnLastTick) {
                                    this.freeTone(oldTone);
                                }
                                else {
                                    this.releaseTone(instrumentState, oldTone);
                                }
                                tone = this.newTone();
                                toneList.set(toneCount, tone);
                            }
                            else {
                                tone = toneList.get(toneCount);
                            }
                            toneCount++;
                            for (let i = 0; i < note.pitches.length; i++) {
                                tone.pitches[i] = note.pitches[i];
                            }
                            tone.pitchCount = note.pitches.length;
                            tone.chordSize = 1;
                            tone.instrumentIndex = instrumentIndex;
                            tone.note = note;
                            tone.noteStartPart = note.start;
                            tone.noteEndPart = note.end;
                            tone.prevNote = prevNoteForThisInstrument;
                            tone.nextNote = nextNoteForThisInstrument;
                            tone.prevNotePitchIndex = 0;
                            tone.nextNotePitchIndex = 0;
                            tone.atNoteStart = atNoteStart;
                            tone.passedEndOfNote = false;
                            tone.forceContinueAtStart = forceContinueAtStart;
                            tone.forceContinueAtEnd = forceContinueAtEnd;
                            this.computeTone(song, channelIndex, samplesPerTick, tone, false, false);
                        }
                        else {
                            const transition = instrument.getTransition();
                            if (((transition.isSeamless && !transition.slides && chord.strumParts == 0) || forceContinueAtStart) && (Config.ticksPerPart * note.start == currentTick) && prevNoteForThisInstrument != null) {
                                this.moveTonesIntoOrderedTempMatchedList(toneList, note.pitches);
                            }
                            let strumOffsetParts = 0;
                            for (let i = 0; i < note.pitches.length; i++) {
                                let prevNoteForThisTone = (tonesInPrevNote > i) ? prevNoteForThisInstrument : null;
                                let noteForThisTone = note;
                                let nextNoteForThisTone = (tonesInNextNote > i) ? nextNoteForThisInstrument : null;
                                let noteStartPart = noteForThisTone.start + strumOffsetParts;
                                let passedEndOfNote = false;
                                if (noteStartPart > currentPart) {
                                    if (toneList.count() > i && (transition.isSeamless || forceContinueAtStart) && prevNoteForThisTone != null) {
                                        nextNoteForThisTone = noteForThisTone;
                                        noteForThisTone = prevNoteForThisTone;
                                        prevNoteForThisTone = null;
                                        noteStartPart = noteForThisTone.start + strumOffsetParts;
                                        passedEndOfNote = true;
                                    }
                                    else {
                                        break;
                                    }
                                }
                                let noteEndPart = noteForThisTone.end;
                                if ((transition.isSeamless || forceContinueAtStart) && nextNoteForThisTone != null) {
                                    noteEndPart = Math.min(Config.partsPerBeat * this.song.beatsPerBar, noteEndPart + strumOffsetParts);
                                }
                                if ((!transition.continues && !forceContinueAtStart) || prevNoteForThisTone == null) {
                                    strumOffsetParts += chord.strumParts;
                                }
                                const atNoteStart = (Config.ticksPerPart * noteStartPart == currentTick);
                                let tone;
                                if (this.tempMatchedPitchTones[toneCount] != null) {
                                    tone = this.tempMatchedPitchTones[toneCount];
                                    this.tempMatchedPitchTones[toneCount] = null;
                                    toneList.pushBack(tone);
                                }
                                else if (toneList.count() <= toneCount) {
                                    tone = this.newTone();
                                    toneList.pushBack(tone);
                                }
                                else if (atNoteStart && ((!transition.isSeamless && !forceContinueAtStart) || prevNoteForThisTone == null)) {
                                    const oldTone = toneList.get(toneCount);
                                    if (oldTone.isOnLastTick) {
                                        this.freeTone(oldTone);
                                    }
                                    else {
                                        this.releaseTone(instrumentState, oldTone);
                                    }
                                    tone = this.newTone();
                                    toneList.set(toneCount, tone);
                                }
                                else {
                                    tone = toneList.get(toneCount);
                                }
                                toneCount++;
                                tone.pitches[0] = noteForThisTone.pitches[i];
                                tone.pitchCount = 1;
                                tone.chordSize = noteForThisTone.pitches.length;
                                tone.instrumentIndex = instrumentIndex;
                                tone.note = noteForThisTone;
                                tone.noteStartPart = noteStartPart;
                                tone.noteEndPart = noteEndPart;
                                tone.prevNote = prevNoteForThisTone;
                                tone.nextNote = nextNoteForThisTone;
                                tone.prevNotePitchIndex = i;
                                tone.nextNotePitchIndex = i;
                                tone.atNoteStart = atNoteStart;
                                tone.passedEndOfNote = passedEndOfNote;
                                tone.forceContinueAtStart = forceContinueAtStart && prevNoteForThisTone != null;
                                tone.forceContinueAtEnd = forceContinueAtEnd && nextNoteForThisTone != null;
                                this.computeTone(song, channelIndex, samplesPerTick, tone, false, false);
                            }
                        }
                    }
                    while (toneList.count() > toneCount) {
                        const tone = toneList.popBack();
                        const channel = song.channels[channelIndex];
                        if (tone.instrumentIndex < channel.instruments.length && !tone.isOnLastTick) {
                            const instrumentState = channelState.instruments[tone.instrumentIndex];
                            this.releaseTone(instrumentState, tone);
                        }
                        else {
                            this.freeTone(tone);
                        }
                    }
                    this.clearTempMatchedPitchTones(toneCount, instrumentState);
                }
            }
        }
        clearTempMatchedPitchTones(toneCount, instrumentState) {
            for (let i = toneCount; i < this.tempMatchedPitchTones.length; i++) {
                const oldTone = this.tempMatchedPitchTones[i];
                if (oldTone != null) {
                    if (oldTone.isOnLastTick) {
                        this.freeTone(oldTone);
                    }
                    else {
                        this.releaseTone(instrumentState, oldTone);
                    }
                    this.tempMatchedPitchTones[i] = null;
                }
            }
        }
        playTone(channelIndex, bufferIndex, runLength, tone) {
            const channelState = this.channels[channelIndex];
            const instrumentState = channelState.instruments[tone.instrumentIndex];
            if (instrumentState.synthesizer != null)
                instrumentState.synthesizer(this, bufferIndex, runLength, tone, instrumentState);
            tone.envelopeComputer.clearEnvelopes();
        }
        playModTone(song, channelIndex, samplesPerTick, bufferIndex, roundedSamplesPerTick, tone, released, shouldFadeOutFast) {
            const channel = song.channels[channelIndex];
            const instrument = channel.instruments[tone.instrumentIndex];
            if (tone.note != null) {
                const ticksIntoBar = this.getTicksIntoBar();
                const partTimeTickStart = (ticksIntoBar) / Config.ticksPerPart;
                const partTimeTickEnd = (ticksIntoBar + 1) / Config.ticksPerPart;
                const tickSampleCountdown = this.tickSampleCountdown;
                const startRatio = 1.0 - (tickSampleCountdown) / samplesPerTick;
                const endRatio = 1.0 - (tickSampleCountdown - roundedSamplesPerTick) / samplesPerTick;
                const partTimeStart = partTimeTickStart + (partTimeTickEnd - partTimeTickStart) * startRatio;
                const partTimeEnd = partTimeTickStart + (partTimeTickEnd - partTimeTickStart) * endRatio;
                const tickTimeStart = Config.ticksPerPart * partTimeStart;
                const tickTimeEnd = Config.ticksPerPart * partTimeEnd;
                const endPinIndex = tone.note.getEndPinIndex(this.getCurrentPart());
                const startPin = tone.note.pins[endPinIndex - 1];
                const endPin = tone.note.pins[endPinIndex];
                const startPinTick = (tone.note.start + startPin.time) * Config.ticksPerPart;
                const endPinTick = (tone.note.start + endPin.time) * Config.ticksPerPart;
                const ratioStart = (tickTimeStart - startPinTick) / (endPinTick - startPinTick);
                const ratioEnd = (tickTimeEnd - startPinTick) / (endPinTick - startPinTick);
                tone.expression = startPin.size + (endPin.size - startPin.size) * ratioStart;
                tone.expressionDelta = (startPin.size + (endPin.size - startPin.size) * ratioEnd) - tone.expression;
                Synth.modSynth(this, bufferIndex, roundedSamplesPerTick, tone, instrument);
            }
        }
        static computeChordExpression(chordSize) {
            return 1.0 / ((chordSize - 1) * 0.25 + 1.0);
        }
        computeTone(song, channelIndex, samplesPerTick, tone, released, shouldFadeOutFast) {
            const roundedSamplesPerTick = Math.ceil(samplesPerTick);
            const channel = song.channels[channelIndex];
            const channelState = this.channels[channelIndex];
            const instrument = channel.instruments[tone.instrumentIndex];
            const instrumentState = channelState.instruments[tone.instrumentIndex];
            instrumentState.awake = true;
            instrumentState.tonesAddedInThisTick = true;
            if (!instrumentState.computed) {
                instrumentState.compute(this, instrument, samplesPerTick, roundedSamplesPerTick, tone, channelIndex, tone.instrumentIndex);
            }
            const transition = instrument.getTransition();
            const chord = instrument.getChord();
            const chordExpression = chord.singleTone ? 1.0 : Synth.computeChordExpression(tone.chordSize);
            const isNoiseChannel = song.getChannelIsNoise(channelIndex);
            const intervalScale = isNoiseChannel ? Config.noiseInterval : 1;
            const secondsPerPart = Config.ticksPerPart * samplesPerTick / this.samplesPerSecond;
            const sampleTime = 1.0 / this.samplesPerSecond;
            const beatsPerPart = 1.0 / Config.partsPerBeat;
            const ticksIntoBar = this.getTicksIntoBar();
            const partTimeStart = (ticksIntoBar) / Config.ticksPerPart;
            const partTimeEnd = (ticksIntoBar + 1.0) / Config.ticksPerPart;
            const currentPart = this.getCurrentPart();
            let specialIntervalMult = 1.0;
            tone.specialIntervalExpressionMult = 1.0;
            let toneIsOnLastTick = shouldFadeOutFast;
            let intervalStart = 0.0;
            let intervalEnd = 0.0;
            let fadeExpressionStart = 1.0;
            let fadeExpressionEnd = 1.0;
            let chordExpressionStart = chordExpression;
            let chordExpressionEnd = chordExpression;
            let expressionReferencePitch = 16;
            let basePitch = Config.keys[song.key].basePitch;
            let baseExpression = 1.0;
            let pitchDamping = 48;
            if (instrument.type == 3) {
                baseExpression = Config.spectrumBaseExpression;
                if (isNoiseChannel) {
                    basePitch = Config.spectrumBasePitch;
                    baseExpression *= 2.0;
                }
                expressionReferencePitch = Config.spectrumBasePitch;
                pitchDamping = 28;
            }
            else if (instrument.type == 4) {
                basePitch = Config.spectrumBasePitch;
                baseExpression = Config.drumsetBaseExpression;
                expressionReferencePitch = basePitch;
            }
            else if (instrument.type == 2) {
                basePitch = Config.chipNoises[instrument.chipNoise].basePitch;
                baseExpression = Config.noiseBaseExpression;
                expressionReferencePitch = basePitch;
                pitchDamping = Config.chipNoises[instrument.chipNoise].isSoft ? 24.0 : 60.0;
            }
            else if (instrument.type == 1) {
                baseExpression = Config.fmBaseExpression;
            }
            else if (instrument.type == 0 || instrument.type == 8) {
                baseExpression = Config.chipBaseExpression;
            }
            else if (instrument.type == 5) {
                baseExpression = Config.harmonicsBaseExpression;
            }
            else if (instrument.type == 6) {
                baseExpression = Config.pwmBaseExpression;
            }
            else if (instrument.type == 7) {
                baseExpression = Config.pickedStringBaseExpression;
            }
            else if (instrument.type == 9) {
                baseExpression = 1.0;
                expressionReferencePitch = 0;
                pitchDamping = 1.0;
                basePitch = 0;
            }
            else {
                throw new Error("Unknown instrument type in computeTone.");
            }
            if ((tone.atNoteStart && !transition.isSeamless && !tone.forceContinueAtStart) || tone.freshlyAllocated) {
                tone.reset();
            }
            tone.freshlyAllocated = false;
            for (let i = 0; i < Config.maxPitchOrOperatorCount; i++) {
                tone.phaseDeltas[i] = 0.0;
                tone.phaseDeltaScales[i] = 0.0;
                tone.operatorExpressions[i] = 0.0;
                tone.operatorExpressionDeltas[i] = 0.0;
            }
            tone.expression = 0.0;
            tone.expressionDelta = 0.0;
            for (let i = 0; i < Config.operatorCount; i++) {
                tone.operatorWaves[i] = Synth.getOperatorWave(instrument.operators[i].waveform, instrument.operators[i].pulseWidth);
            }
            if (released) {
                const startTicksSinceReleased = tone.ticksSinceReleased;
                const endTicksSinceReleased = tone.ticksSinceReleased + 1.0;
                intervalStart = intervalEnd = tone.lastInterval;
                const fadeOutTicks = Math.abs(instrument.getFadeOutTicks());
                fadeExpressionStart = Synth.noteSizeToVolumeMult((1.0 - startTicksSinceReleased / fadeOutTicks) * Config.noteSizeMax);
                fadeExpressionEnd = Synth.noteSizeToVolumeMult((1.0 - endTicksSinceReleased / fadeOutTicks) * Config.noteSizeMax);
                if (shouldFadeOutFast) {
                    fadeExpressionEnd = 0.0;
                }
                if (tone.ticksSinceReleased + 1 >= fadeOutTicks)
                    toneIsOnLastTick = true;
            }
            else if (tone.note == null) {
                fadeExpressionStart = fadeExpressionEnd = 1.0;
                tone.lastInterval = 0;
                tone.ticksSinceReleased = 0;
                tone.liveInputSamplesHeld += roundedSamplesPerTick;
            }
            else {
                const note = tone.note;
                const nextNote = tone.nextNote;
                const noteStartPart = tone.noteStartPart;
                const noteEndPart = tone.noteEndPart;
                const endPinIndex = note.getEndPinIndex(currentPart);
                const startPin = note.pins[endPinIndex - 1];
                const endPin = note.pins[endPinIndex];
                const noteStartTick = noteStartPart * Config.ticksPerPart;
                const noteEndTick = noteEndPart * Config.ticksPerPart;
                const pinStart = (note.start + startPin.time) * Config.ticksPerPart;
                const pinEnd = (note.start + endPin.time) * Config.ticksPerPart;
                tone.ticksSinceReleased = 0;
                const tickTimeStart = currentPart * Config.ticksPerPart + this.tick;
                const tickTimeEnd = tickTimeStart + 1.0;
                const noteTicksPassedTickStart = tickTimeStart - noteStartTick;
                const noteTicksPassedTickEnd = tickTimeEnd - noteStartTick;
                const pinRatioStart = Math.min(1.0, (tickTimeStart - pinStart) / (pinEnd - pinStart));
                const pinRatioEnd = Math.min(1.0, (tickTimeEnd - pinStart) / (pinEnd - pinStart));
                fadeExpressionStart = 1.0;
                fadeExpressionEnd = 1.0;
                intervalStart = startPin.interval + (endPin.interval - startPin.interval) * pinRatioStart;
                intervalEnd = startPin.interval + (endPin.interval - startPin.interval) * pinRatioEnd;
                tone.lastInterval = intervalEnd;
                if ((!transition.isSeamless && !tone.forceContinueAtEnd) || nextNote == null) {
                    const fadeOutTicks = -instrument.getFadeOutTicks();
                    if (fadeOutTicks > 0.0) {
                        const noteLengthTicks = noteEndTick - noteStartTick;
                        fadeExpressionStart *= Math.min(1.0, (noteLengthTicks - noteTicksPassedTickStart) / fadeOutTicks);
                        fadeExpressionEnd *= Math.min(1.0, (noteLengthTicks - noteTicksPassedTickEnd) / fadeOutTicks);
                        if (tickTimeEnd >= noteStartTick + noteLengthTicks)
                            toneIsOnLastTick = true;
                    }
                }
            }
            tone.isOnLastTick = toneIsOnLastTick;
            let tmpNoteFilter = instrument.noteFilter;
            let startPoint;
            let endPoint;
            if (instrument.noteFilterType) {
                const noteFilterSettingsStart = instrument.noteFilter;
                if (instrument.noteSubFilters[1] == null)
                    instrument.noteSubFilters[1] = new FilterSettings();
                const noteFilterSettingsEnd = instrument.noteSubFilters[1];
                let startSimpleFreq = instrument.noteFilterSimpleCut;
                let startSimpleGain = instrument.noteFilterSimplePeak;
                let endSimpleFreq = instrument.noteFilterSimpleCut;
                let endSimpleGain = instrument.noteFilterSimplePeak;
                let filterChanges = false;
                if (this.isModActive(Config.modulators.dictionary["note filt cut"].index, channelIndex, tone.instrumentIndex)) {
                    startSimpleFreq = this.getModValue(Config.modulators.dictionary["note filt cut"].index, channelIndex, tone.instrumentIndex, false);
                    endSimpleFreq = this.getModValue(Config.modulators.dictionary["note filt cut"].index, channelIndex, tone.instrumentIndex, true);
                    filterChanges = true;
                }
                if (this.isModActive(Config.modulators.dictionary["note filt peak"].index, channelIndex, tone.instrumentIndex)) {
                    startSimpleGain = this.getModValue(Config.modulators.dictionary["note filt peak"].index, channelIndex, tone.instrumentIndex, false);
                    endSimpleGain = this.getModValue(Config.modulators.dictionary["note filt peak"].index, channelIndex, tone.instrumentIndex, true);
                    filterChanges = true;
                }
                noteFilterSettingsStart.convertLegacySettingsForSynth(startSimpleFreq, startSimpleGain, !filterChanges);
                noteFilterSettingsEnd.convertLegacySettingsForSynth(endSimpleFreq, endSimpleGain, !filterChanges);
                startPoint = noteFilterSettingsStart.controlPoints[0];
                endPoint = noteFilterSettingsEnd.controlPoints[0];
                instrument.noteFilter = noteFilterSettingsStart;
                instrument.tmpNoteFilterStart = noteFilterSettingsStart;
            }
            const envelopeComputer = tone.envelopeComputer;
            envelopeComputer.computeEnvelopes(instrument, currentPart, Config.ticksPerPart * partTimeStart, samplesPerTick / this.samplesPerSecond, tone);
            const envelopeStarts = tone.envelopeComputer.envelopeStarts;
            const envelopeEnds = tone.envelopeComputer.envelopeEnds;
            instrument.noteFilter = tmpNoteFilter;
            if (tone.note != null && transition.slides) {
                const prevNote = tone.prevNote;
                const nextNote = tone.nextNote;
                if (prevNote != null) {
                    const intervalDiff = prevNote.pitches[tone.prevNotePitchIndex] + prevNote.pins[prevNote.pins.length - 1].interval - tone.pitches[0];
                    if (envelopeComputer.prevSlideStart)
                        intervalStart += intervalDiff * envelopeComputer.prevSlideRatioStart;
                    if (envelopeComputer.prevSlideEnd)
                        intervalEnd += intervalDiff * envelopeComputer.prevSlideRatioEnd;
                    if (!chord.singleTone) {
                        const chordSizeDiff = prevNote.pitches.length - tone.chordSize;
                        if (envelopeComputer.prevSlideStart)
                            chordExpressionStart = Synth.computeChordExpression(tone.chordSize + chordSizeDiff * envelopeComputer.prevSlideRatioStart);
                        if (envelopeComputer.prevSlideEnd)
                            chordExpressionEnd = Synth.computeChordExpression(tone.chordSize + chordSizeDiff * envelopeComputer.prevSlideRatioEnd);
                    }
                }
                if (nextNote != null) {
                    const intervalDiff = nextNote.pitches[tone.nextNotePitchIndex] - (tone.pitches[0] + tone.note.pins[tone.note.pins.length - 1].interval);
                    if (envelopeComputer.nextSlideStart)
                        intervalStart += intervalDiff * envelopeComputer.nextSlideRatioStart;
                    if (envelopeComputer.nextSlideEnd)
                        intervalEnd += intervalDiff * envelopeComputer.nextSlideRatioEnd;
                    if (!chord.singleTone) {
                        const chordSizeDiff = nextNote.pitches.length - tone.chordSize;
                        if (envelopeComputer.nextSlideStart)
                            chordExpressionStart = Synth.computeChordExpression(tone.chordSize + chordSizeDiff * envelopeComputer.nextSlideRatioStart);
                        if (envelopeComputer.nextSlideEnd)
                            chordExpressionEnd = Synth.computeChordExpression(tone.chordSize + chordSizeDiff * envelopeComputer.nextSlideRatioEnd);
                    }
                }
            }
            if (effectsIncludePitchShift(instrument.effects)) {
                let pitchShift = Config.justIntonationSemitones[instrument.pitchShift] / intervalScale;
                let pitchShiftScalarStart = 1.0;
                let pitchShiftScalarEnd = 1.0;
                if (this.isModActive(Config.modulators.dictionary["pitch shift"].index, channelIndex, tone.instrumentIndex)) {
                    pitchShift = Config.justIntonationSemitones[Config.justIntonationSemitones.length - 1];
                    pitchShiftScalarStart = (this.getModValue(Config.modulators.dictionary["pitch shift"].index, channelIndex, tone.instrumentIndex, false)) / (Config.pitchShiftCenter);
                    pitchShiftScalarEnd = (this.getModValue(Config.modulators.dictionary["pitch shift"].index, channelIndex, tone.instrumentIndex, true)) / (Config.pitchShiftCenter);
                }
                const envelopeStart = envelopeStarts[14];
                const envelopeEnd = envelopeEnds[14];
                intervalStart += pitchShift * envelopeStart * pitchShiftScalarStart;
                intervalEnd += pitchShift * envelopeEnd * pitchShiftScalarEnd;
            }
            if (effectsIncludeDetune(instrument.effects) || this.isModActive(Config.modulators.dictionary["song detune"].index, channelIndex, tone.instrumentIndex)) {
                const envelopeStart = envelopeStarts[15];
                const envelopeEnd = envelopeEnds[15];
                let modDetuneStart = instrument.detune;
                let modDetuneEnd = instrument.detune;
                if (this.isModActive(Config.modulators.dictionary["detune"].index, channelIndex, tone.instrumentIndex)) {
                    modDetuneStart = this.getModValue(Config.modulators.dictionary["detune"].index, channelIndex, tone.instrumentIndex, false) + Config.detuneCenter;
                    modDetuneEnd = this.getModValue(Config.modulators.dictionary["detune"].index, channelIndex, tone.instrumentIndex, true) + Config.detuneCenter;
                }
                if (this.isModActive(Config.modulators.dictionary["song detune"].index, channelIndex, tone.instrumentIndex)) {
                    modDetuneStart += 4 * this.getModValue(Config.modulators.dictionary["song detune"].index, channelIndex, tone.instrumentIndex, false);
                    modDetuneEnd += 4 * this.getModValue(Config.modulators.dictionary["song detune"].index, channelIndex, tone.instrumentIndex, true);
                }
                intervalStart += Synth.detuneToCents((modDetuneStart) * envelopeStart) * Config.pitchesPerOctave / (12.0 * 100.0);
                intervalEnd += Synth.detuneToCents((modDetuneEnd) * envelopeEnd) * Config.pitchesPerOctave / (12.0 * 100.0);
            }
            if (effectsIncludeVibrato(instrument.effects)) {
                let delayTicks;
                let vibratoAmplitudeStart;
                let vibratoAmplitudeEnd;
                if (instrument.vibrato == Config.vibratos.length) {
                    delayTicks = instrument.vibratoDelay * 2;
                    if (instrument.vibratoDelay == Config.modulators.dictionary["vibrato delay"].maxRawVol)
                        delayTicks = Number.POSITIVE_INFINITY;
                    vibratoAmplitudeStart = instrument.vibratoDepth;
                    vibratoAmplitudeEnd = vibratoAmplitudeStart;
                }
                else {
                    delayTicks = Config.vibratos[instrument.vibrato].delayTicks;
                    vibratoAmplitudeStart = Config.vibratos[instrument.vibrato].amplitude;
                    vibratoAmplitudeEnd = vibratoAmplitudeStart;
                }
                if (this.isModActive(Config.modulators.dictionary["vibrato delay"].index, channelIndex, tone.instrumentIndex)) {
                    delayTicks = this.getModValue(Config.modulators.dictionary["vibrato delay"].index, channelIndex, tone.instrumentIndex, false) * 2;
                    if (delayTicks == Config.modulators.dictionary["vibrato delay"].maxRawVol * 2)
                        delayTicks = Number.POSITIVE_INFINITY;
                }
                if (this.isModActive(Config.modulators.dictionary["vibrato depth"].index, channelIndex, tone.instrumentIndex)) {
                    vibratoAmplitudeStart = this.getModValue(Config.modulators.dictionary["vibrato depth"].index, channelIndex, tone.instrumentIndex, false) / 25;
                    vibratoAmplitudeEnd = this.getModValue(Config.modulators.dictionary["vibrato depth"].index, channelIndex, tone.instrumentIndex, true) / 25;
                }
                let vibratoStart;
                if (tone.prevVibrato != null) {
                    vibratoStart = tone.prevVibrato;
                }
                else {
                    let lfoStart = Synth.getLFOAmplitude(instrument, secondsPerPart * instrument.LFOtime);
                    const vibratoDepthEnvelopeStart = envelopeStarts[16];
                    vibratoStart = vibratoAmplitudeStart * lfoStart * vibratoDepthEnvelopeStart;
                    if (delayTicks > 0.0) {
                        const ticksUntilVibratoStart = delayTicks - envelopeComputer.noteTicksStart;
                        vibratoStart *= Math.max(0.0, Math.min(1.0, 1.0 - ticksUntilVibratoStart / 2.0));
                    }
                }
                let lfoEnd = Synth.getLFOAmplitude(instrument, secondsPerPart * instrument.nextLFOtime);
                const vibratoDepthEnvelopeEnd = envelopeEnds[16];
                if (instrument.type != 9) {
                    let vibratoEnd = vibratoAmplitudeEnd * lfoEnd * vibratoDepthEnvelopeEnd;
                    if (delayTicks > 0.0) {
                        const ticksUntilVibratoEnd = delayTicks - envelopeComputer.noteTicksEnd;
                        vibratoEnd *= Math.max(0.0, Math.min(1.0, 1.0 - ticksUntilVibratoEnd / 2.0));
                    }
                    tone.prevVibrato = vibratoEnd;
                    intervalStart += vibratoStart;
                    intervalEnd += vibratoEnd;
                }
            }
            if ((!transition.isSeamless && !tone.forceContinueAtStart) || tone.prevNote == null) {
                const fadeInSeconds = instrument.getFadeInSeconds();
                if (fadeInSeconds > 0.0) {
                    fadeExpressionStart *= Math.min(1.0, envelopeComputer.noteSecondsStart / fadeInSeconds);
                    fadeExpressionEnd *= Math.min(1.0, envelopeComputer.noteSecondsEnd / fadeInSeconds);
                }
            }
            if (instrument.type == 4 && tone.drumsetPitch == null) {
                tone.drumsetPitch = tone.pitches[0];
                if (tone.note != null)
                    tone.drumsetPitch += tone.note.pickMainInterval();
                tone.drumsetPitch = Math.max(0, Math.min(Config.drumCount - 1, tone.drumsetPitch));
            }
            let noteFilterExpression = envelopeComputer.lowpassCutoffDecayVolumeCompensation;
            if (!effectsIncludeNoteFilter(instrument.effects)) {
                tone.noteFilterCount = 0;
            }
            else {
                const noteAllFreqsEnvelopeStart = envelopeStarts[1];
                const noteAllFreqsEnvelopeEnd = envelopeEnds[1];
                if (instrument.noteFilterType) {
                    const noteFreqEnvelopeStart = envelopeStarts[17];
                    const noteFreqEnvelopeEnd = envelopeEnds[17];
                    const notePeakEnvelopeStart = envelopeStarts[25];
                    const notePeakEnvelopeEnd = envelopeEnds[25];
                    startPoint.toCoefficients(Synth.tempFilterStartCoefficients, this.samplesPerSecond, noteAllFreqsEnvelopeStart * noteFreqEnvelopeStart, notePeakEnvelopeStart);
                    endPoint.toCoefficients(Synth.tempFilterEndCoefficients, this.samplesPerSecond, noteAllFreqsEnvelopeEnd * noteFreqEnvelopeEnd, notePeakEnvelopeEnd);
                    if (tone.noteFilters.length < 1)
                        tone.noteFilters[0] = new DynamicBiquadFilter();
                    tone.noteFilters[0].loadCoefficientsWithGradient(Synth.tempFilterStartCoefficients, Synth.tempFilterEndCoefficients, 1.0 / roundedSamplesPerTick, startPoint.type == 0);
                    noteFilterExpression *= startPoint.getVolumeCompensationMult();
                    tone.noteFilterCount = 1;
                }
                else {
                    const noteFilterSettings = (instrument.tmpNoteFilterStart != null) ? instrument.tmpNoteFilterStart : instrument.noteFilter;
                    for (let i = 0; i < noteFilterSettings.controlPointCount; i++) {
                        const noteFreqEnvelopeStart = envelopeStarts[17 + i];
                        const noteFreqEnvelopeEnd = envelopeEnds[17 + i];
                        const notePeakEnvelopeStart = envelopeStarts[25 + i];
                        const notePeakEnvelopeEnd = envelopeEnds[25 + i];
                        let startPoint = noteFilterSettings.controlPoints[i];
                        const endPoint = (instrument.tmpNoteFilterEnd != null && instrument.tmpNoteFilterEnd.controlPoints[i] != null) ? instrument.tmpNoteFilterEnd.controlPoints[i] : noteFilterSettings.controlPoints[i];
                        if (startPoint.type != endPoint.type) {
                            startPoint = endPoint;
                        }
                        startPoint.toCoefficients(Synth.tempFilterStartCoefficients, this.samplesPerSecond, noteAllFreqsEnvelopeStart * noteFreqEnvelopeStart, notePeakEnvelopeStart);
                        endPoint.toCoefficients(Synth.tempFilterEndCoefficients, this.samplesPerSecond, noteAllFreqsEnvelopeEnd * noteFreqEnvelopeEnd, notePeakEnvelopeEnd);
                        if (tone.noteFilters.length <= i)
                            tone.noteFilters[i] = new DynamicBiquadFilter();
                        tone.noteFilters[i].loadCoefficientsWithGradient(Synth.tempFilterStartCoefficients, Synth.tempFilterEndCoefficients, 1.0 / roundedSamplesPerTick, startPoint.type == 0);
                        noteFilterExpression *= startPoint.getVolumeCompensationMult();
                    }
                    tone.noteFilterCount = noteFilterSettings.controlPointCount;
                }
            }
            if (instrument.type == 4) {
                const drumsetFilterEnvelope = instrument.getDrumsetEnvelope(tone.drumsetPitch);
                noteFilterExpression *= EnvelopeComputer.getLowpassCutoffDecayVolumeCompensation(drumsetFilterEnvelope);
                let drumsetFilterEnvelopeStart = EnvelopeComputer.computeEnvelope(drumsetFilterEnvelope, envelopeComputer.noteSecondsStart, beatsPerPart * partTimeStart, envelopeComputer.noteSizeStart);
                let drumsetFilterEnvelopeEnd = EnvelopeComputer.computeEnvelope(drumsetFilterEnvelope, envelopeComputer.noteSecondsEnd, beatsPerPart * partTimeEnd, envelopeComputer.noteSizeEnd);
                if (envelopeComputer.prevSlideStart) {
                    const other = EnvelopeComputer.computeEnvelope(drumsetFilterEnvelope, envelopeComputer.prevNoteSecondsStart, beatsPerPart * partTimeStart, envelopeComputer.prevNoteSize);
                    drumsetFilterEnvelopeStart += (other - drumsetFilterEnvelopeStart) * envelopeComputer.prevSlideRatioStart;
                }
                if (envelopeComputer.prevSlideEnd) {
                    const other = EnvelopeComputer.computeEnvelope(drumsetFilterEnvelope, envelopeComputer.prevNoteSecondsEnd, beatsPerPart * partTimeEnd, envelopeComputer.prevNoteSize);
                    drumsetFilterEnvelopeEnd += (other - drumsetFilterEnvelopeEnd) * envelopeComputer.prevSlideRatioEnd;
                }
                if (envelopeComputer.nextSlideStart) {
                    const other = EnvelopeComputer.computeEnvelope(drumsetFilterEnvelope, 0.0, beatsPerPart * partTimeStart, envelopeComputer.nextNoteSize);
                    drumsetFilterEnvelopeStart += (other - drumsetFilterEnvelopeStart) * envelopeComputer.nextSlideRatioStart;
                }
                if (envelopeComputer.nextSlideEnd) {
                    const other = EnvelopeComputer.computeEnvelope(drumsetFilterEnvelope, 0.0, beatsPerPart * partTimeEnd, envelopeComputer.nextNoteSize);
                    drumsetFilterEnvelopeEnd += (other - drumsetFilterEnvelopeEnd) * envelopeComputer.nextSlideRatioEnd;
                }
                const point = this.tempDrumSetControlPoint;
                point.type = 0;
                point.gain = FilterControlPoint.getRoundedSettingValueFromLinearGain(0.5);
                point.freq = FilterControlPoint.getRoundedSettingValueFromHz(8000.0);
                point.toCoefficients(Synth.tempFilterStartCoefficients, this.samplesPerSecond, drumsetFilterEnvelopeStart * (1.0 + drumsetFilterEnvelopeStart), 1.0);
                point.toCoefficients(Synth.tempFilterEndCoefficients, this.samplesPerSecond, drumsetFilterEnvelopeEnd * (1.0 + drumsetFilterEnvelopeEnd), 1.0);
                if (tone.noteFilters.length == tone.noteFilterCount)
                    tone.noteFilters[tone.noteFilterCount] = new DynamicBiquadFilter();
                tone.noteFilters[tone.noteFilterCount].loadCoefficientsWithGradient(Synth.tempFilterStartCoefficients, Synth.tempFilterEndCoefficients, 1.0 / roundedSamplesPerTick, true);
                tone.noteFilterCount++;
            }
            noteFilterExpression = Math.min(3.0, noteFilterExpression);
            if (instrument.type == 1) {
                let sineExpressionBoost = 1.0;
                let totalCarrierExpression = 0.0;
                let arpeggioInterval = 0;
                const arpeggiates = chord.arpeggiates;
                if (tone.pitchCount > 1 && arpeggiates) {
                    const arpeggio = Math.floor(instrument.arpTime / Config.ticksPerArpeggio);
                    arpeggioInterval = tone.pitches[getArpeggioPitchIndex(tone.pitchCount, instrument.fastTwoNoteArp, arpeggio)] - tone.pitches[0];
                }
                const carrierCount = Config.algorithms[instrument.algorithm].carrierCount;
                for (let i = 0; i < Config.operatorCount; i++) {
                    const associatedCarrierIndex = Config.algorithms[instrument.algorithm].associatedCarrier[i] - 1;
                    const pitch = tone.pitches[arpeggiates ? 0 : ((i < tone.pitchCount) ? i : ((associatedCarrierIndex < tone.pitchCount) ? associatedCarrierIndex : 0))];
                    const freqMult = Config.operatorFrequencies[instrument.operators[i].frequency].mult;
                    const interval = Config.operatorCarrierInterval[associatedCarrierIndex] + arpeggioInterval;
                    const pitchStart = basePitch + (pitch + intervalStart) * intervalScale + interval;
                    const pitchEnd = basePitch + (pitch + intervalEnd) * intervalScale + interval;
                    const baseFreqStart = Instrument.frequencyFromPitch(pitchStart);
                    const baseFreqEnd = Instrument.frequencyFromPitch(pitchEnd);
                    const hzOffset = Config.operatorFrequencies[instrument.operators[i].frequency].hzOffset;
                    const targetFreqStart = freqMult * baseFreqStart + hzOffset;
                    const targetFreqEnd = freqMult * baseFreqEnd + hzOffset;
                    const freqEnvelopeStart = envelopeStarts[5 + i];
                    const freqEnvelopeEnd = envelopeEnds[5 + i];
                    let freqStart;
                    let freqEnd;
                    if (freqEnvelopeStart != 1.0 || freqEnvelopeEnd != 1.0) {
                        freqStart = Math.pow(2.0, Math.log2(targetFreqStart / baseFreqStart) * freqEnvelopeStart) * baseFreqStart;
                        freqEnd = Math.pow(2.0, Math.log2(targetFreqEnd / baseFreqEnd) * freqEnvelopeEnd) * baseFreqEnd;
                    }
                    else {
                        freqStart = targetFreqStart;
                        freqEnd = targetFreqEnd;
                    }
                    tone.phaseDeltas[i] = freqStart * sampleTime;
                    tone.phaseDeltaScales[i] = Math.pow(freqEnd / freqStart, 1.0 / roundedSamplesPerTick);
                    let amplitudeStart = instrument.operators[i].amplitude;
                    let amplitudeEnd = instrument.operators[i].amplitude;
                    if (this.isModActive(Config.modulators.dictionary["fm slider 1"].index + i, channelIndex, tone.instrumentIndex)) {
                        amplitudeStart *= this.getModValue(Config.modulators.dictionary["fm slider 1"].index + i, channelIndex, tone.instrumentIndex, false) / 15.0;
                        amplitudeEnd *= this.getModValue(Config.modulators.dictionary["fm slider 1"].index + i, channelIndex, tone.instrumentIndex, true) / 15.0;
                    }
                    const amplitudeCurveStart = Synth.operatorAmplitudeCurve(amplitudeStart);
                    const amplitudeCurveEnd = Synth.operatorAmplitudeCurve(amplitudeEnd);
                    const amplitudeMultStart = amplitudeCurveStart * Config.operatorFrequencies[instrument.operators[i].frequency].amplitudeSign;
                    const amplitudeMultEnd = amplitudeCurveEnd * Config.operatorFrequencies[instrument.operators[i].frequency].amplitudeSign;
                    let expressionStart = amplitudeMultStart;
                    let expressionEnd = amplitudeMultEnd;
                    if (i < carrierCount) {
                        let pitchExpressionStart;
                        if (tone.prevPitchExpressions[i] != null) {
                            pitchExpressionStart = tone.prevPitchExpressions[i];
                        }
                        else {
                            pitchExpressionStart = Math.pow(2.0, -(pitchStart - expressionReferencePitch) / pitchDamping);
                        }
                        const pitchExpressionEnd = Math.pow(2.0, -(pitchEnd - expressionReferencePitch) / pitchDamping);
                        tone.prevPitchExpressions[i] = pitchExpressionEnd;
                        expressionStart *= pitchExpressionStart;
                        expressionEnd *= pitchExpressionEnd;
                        totalCarrierExpression += amplitudeCurveEnd;
                    }
                    else {
                        expressionStart *= Config.sineWaveLength * 1.5;
                        expressionEnd *= Config.sineWaveLength * 1.5;
                        sineExpressionBoost *= 1.0 - Math.min(1.0, instrument.operators[i].amplitude / 15);
                    }
                    expressionStart *= envelopeStarts[9 + i];
                    expressionEnd *= envelopeEnds[9 + i];
                    if (this.isModActive(Config.modulators.dictionary["note volume"].index, channelIndex, tone.instrumentIndex)) {
                        const startVal = this.getModValue(Config.modulators.dictionary["note volume"].index, channelIndex, tone.instrumentIndex, false);
                        const endVal = this.getModValue(Config.modulators.dictionary["note volume"].index, channelIndex, tone.instrumentIndex, true);
                        expressionStart *= ((startVal <= 0) ? ((startVal + Config.volumeRange / 2) / (Config.volumeRange / 2)) : Synth.instrumentVolumeToVolumeMult(startVal));
                        expressionEnd *= ((endVal <= 0) ? ((endVal + Config.volumeRange / 2) / (Config.volumeRange / 2)) : Synth.instrumentVolumeToVolumeMult(endVal));
                    }
                    tone.operatorExpressions[i] = expressionStart;
                    tone.operatorExpressionDeltas[i] = (expressionEnd - expressionStart) / roundedSamplesPerTick;
                }
                sineExpressionBoost *= (Math.pow(2.0, (2.0 - 1.4 * instrument.feedbackAmplitude / 15.0)) - 1.0) / 3.0;
                sineExpressionBoost *= 1.0 - Math.min(1.0, Math.max(0.0, totalCarrierExpression - 1) / 2.0);
                sineExpressionBoost = 1.0 + sineExpressionBoost * 3.0;
                const expressionStart = baseExpression * sineExpressionBoost * noteFilterExpression * fadeExpressionStart * chordExpressionStart * envelopeStarts[0];
                const expressionEnd = baseExpression * sineExpressionBoost * noteFilterExpression * fadeExpressionEnd * chordExpressionEnd * envelopeEnds[0];
                tone.expression = expressionStart;
                tone.expressionDelta = (expressionEnd - expressionStart) / roundedSamplesPerTick;
                let useFeedbackAmplitudeStart = instrument.feedbackAmplitude;
                let useFeedbackAmplitudeEnd = instrument.feedbackAmplitude;
                if (this.isModActive(Config.modulators.dictionary["fm feedback"].index, channelIndex, tone.instrumentIndex)) {
                    useFeedbackAmplitudeStart *= this.getModValue(Config.modulators.dictionary["fm feedback"].index, channelIndex, tone.instrumentIndex, false) / 15.0;
                    useFeedbackAmplitudeEnd *= this.getModValue(Config.modulators.dictionary["fm feedback"].index, channelIndex, tone.instrumentIndex, true) / 15.0;
                }
                let feedbackAmplitudeStart = Config.sineWaveLength * 0.3 * useFeedbackAmplitudeStart / 15.0;
                const feedbackAmplitudeEnd = Config.sineWaveLength * 0.3 * useFeedbackAmplitudeEnd / 15.0;
                let feedbackStart = feedbackAmplitudeStart * envelopeStarts[13];
                let feedbackEnd = feedbackAmplitudeEnd * envelopeEnds[13];
                tone.feedbackMult = feedbackStart;
                tone.feedbackDelta = (feedbackEnd - feedbackStart) / roundedSamplesPerTick;
            }
            else {
                const basePhaseDeltaScale = Math.pow(2.0, ((intervalEnd - intervalStart) * intervalScale / 12.0) / roundedSamplesPerTick);
                let pitch = tone.pitches[0];
                if (tone.pitchCount > 1 && (chord.arpeggiates || chord.customInterval)) {
                    const arpeggio = Math.floor(instrument.arpTime / Config.ticksPerArpeggio);
                    if (chord.customInterval) {
                        const intervalOffset = tone.pitches[1 + getArpeggioPitchIndex(tone.pitchCount - 1, instrument.fastTwoNoteArp, arpeggio)] - tone.pitches[0];
                        specialIntervalMult = Math.pow(2.0, intervalOffset / 12.0);
                        tone.specialIntervalExpressionMult = Math.pow(2.0, -intervalOffset / pitchDamping);
                    }
                    else {
                        pitch = tone.pitches[getArpeggioPitchIndex(tone.pitchCount, instrument.fastTwoNoteArp, arpeggio)];
                    }
                }
                const startPitch = basePitch + (pitch + intervalStart) * intervalScale;
                const endPitch = basePitch + (pitch + intervalEnd) * intervalScale;
                let pitchExpressionStart;
                if (tone.prevPitchExpressions[0] != null) {
                    pitchExpressionStart = tone.prevPitchExpressions[0];
                }
                else {
                    pitchExpressionStart = Math.pow(2.0, -(startPitch - expressionReferencePitch) / pitchDamping);
                }
                const pitchExpressionEnd = Math.pow(2.0, -(endPitch - expressionReferencePitch) / pitchDamping);
                tone.prevPitchExpressions[0] = pitchExpressionEnd;
                let settingsExpressionMult = baseExpression * noteFilterExpression;
                if (instrument.type == 2) {
                    settingsExpressionMult *= Config.chipNoises[instrument.chipNoise].expression;
                }
                if (instrument.type == 0) {
                    settingsExpressionMult *= Config.chipWaves[instrument.chipWave].expression;
                }
                if (instrument.type == 6) {
                    const basePulseWidth = getPulseWidthRatio(instrument.pulseWidth);
                    let pulseWidthModStart = basePulseWidth;
                    let pulseWidthModEnd = basePulseWidth;
                    if (this.isModActive(Config.modulators.dictionary["pulse width"].index, channelIndex, tone.instrumentIndex)) {
                        pulseWidthModStart = (this.getModValue(Config.modulators.dictionary["pulse width"].index, channelIndex, tone.instrumentIndex, false)) / (Config.pulseWidthRange * 2);
                        pulseWidthModEnd = (this.getModValue(Config.modulators.dictionary["pulse width"].index, channelIndex, tone.instrumentIndex, true)) / (Config.pulseWidthRange * 2);
                    }
                    const pulseWidthStart = pulseWidthModStart * envelopeStarts[2];
                    const pulseWidthEnd = pulseWidthModEnd * envelopeEnds[2];
                    tone.pulseWidth = pulseWidthStart;
                    tone.pulseWidthDelta = (pulseWidthEnd - pulseWidthStart) / roundedSamplesPerTick;
                }
                if (instrument.type == 7) {
                    let useSustainStart = instrument.stringSustain;
                    let useSustainEnd = instrument.stringSustain;
                    if (this.isModActive(Config.modulators.dictionary["sustain"].index, channelIndex, tone.instrumentIndex)) {
                        useSustainStart = this.getModValue(Config.modulators.dictionary["sustain"].index, channelIndex, tone.instrumentIndex, false);
                        useSustainEnd = this.getModValue(Config.modulators.dictionary["sustain"].index, channelIndex, tone.instrumentIndex, true);
                    }
                    tone.stringSustainStart = useSustainStart;
                    tone.stringSustainEnd = useSustainEnd;
                    settingsExpressionMult *= Math.pow(2.0, 0.7 * (1.0 - useSustainStart / (Config.stringSustainRange - 1)));
                }
                const startFreq = Instrument.frequencyFromPitch(startPitch);
                if (instrument.type == 0 || instrument.type == 8 || instrument.type == 5 || instrument.type == 7) {
                    const unison = Config.unisons[instrument.unison];
                    const voiceCountExpression = (instrument.type == 7) ? 1 : unison.voices / 2.0;
                    settingsExpressionMult *= unison.expression * voiceCountExpression;
                    const unisonEnvelopeStart = envelopeStarts[4];
                    const unisonEnvelopeEnd = envelopeEnds[4];
                    const unisonAStart = Math.pow(2.0, (unison.offset + unison.spread) * unisonEnvelopeStart / 12.0);
                    const unisonAEnd = Math.pow(2.0, (unison.offset + unison.spread) * unisonEnvelopeEnd / 12.0);
                    const unisonBStart = Math.pow(2.0, (unison.offset - unison.spread) * unisonEnvelopeStart / 12.0) * specialIntervalMult;
                    const unisonBEnd = Math.pow(2.0, (unison.offset - unison.spread) * unisonEnvelopeEnd / 12.0) * specialIntervalMult;
                    tone.phaseDeltas[0] = startFreq * sampleTime * unisonAStart;
                    tone.phaseDeltas[1] = startFreq * sampleTime * unisonBStart;
                    tone.phaseDeltaScales[0] = basePhaseDeltaScale * Math.pow(unisonAEnd / unisonAStart, 1.0 / roundedSamplesPerTick);
                    tone.phaseDeltaScales[1] = basePhaseDeltaScale * Math.pow(unisonBEnd / unisonBStart, 1.0 / roundedSamplesPerTick);
                }
                else {
                    tone.phaseDeltas[0] = startFreq * sampleTime;
                    tone.phaseDeltaScales[0] = basePhaseDeltaScale;
                }
                let expressionStart = settingsExpressionMult * fadeExpressionStart * chordExpressionStart * pitchExpressionStart * envelopeStarts[0];
                let expressionEnd = settingsExpressionMult * fadeExpressionEnd * chordExpressionEnd * pitchExpressionEnd * envelopeEnds[0];
                if (this.isModActive(Config.modulators.dictionary["note volume"].index, channelIndex, tone.instrumentIndex)) {
                    const startVal = this.getModValue(Config.modulators.dictionary["note volume"].index, channelIndex, tone.instrumentIndex, false);
                    const endVal = this.getModValue(Config.modulators.dictionary["note volume"].index, channelIndex, tone.instrumentIndex, true);
                    expressionStart *= ((startVal <= 0) ? ((startVal + Config.volumeRange / 2) / (Config.volumeRange / 2)) : Synth.instrumentVolumeToVolumeMult(startVal));
                    expressionEnd *= ((endVal <= 0) ? ((endVal + Config.volumeRange / 2) / (Config.volumeRange / 2)) : Synth.instrumentVolumeToVolumeMult(endVal));
                }
                tone.expression = expressionStart;
                tone.expressionDelta = (expressionEnd - expressionStart) / roundedSamplesPerTick;
                if (instrument.type == 7) {
                    let stringDecayStart;
                    if (tone.prevStringDecay != null) {
                        stringDecayStart = tone.prevStringDecay;
                    }
                    else {
                        const sustainEnvelopeStart = tone.envelopeComputer.envelopeStarts[3];
                        stringDecayStart = 1.0 - Math.min(1.0, sustainEnvelopeStart * tone.stringSustainStart / (Config.stringSustainRange - 1));
                    }
                    const sustainEnvelopeEnd = tone.envelopeComputer.envelopeEnds[3];
                    let stringDecayEnd = 1.0 - Math.min(1.0, sustainEnvelopeEnd * tone.stringSustainEnd / (Config.stringSustainRange - 1));
                    tone.prevStringDecay = stringDecayEnd;
                    const unison = Config.unisons[instrument.unison];
                    for (let i = tone.pickedStrings.length; i < unison.voices; i++) {
                        tone.pickedStrings[i] = new PickedString();
                    }
                    if (tone.atNoteStart && !transition.continues && !tone.forceContinueAtStart) {
                        for (const pickedString of tone.pickedStrings) {
                            pickedString.delayIndex = -1;
                        }
                    }
                    for (let i = 0; i < unison.voices; i++) {
                        tone.pickedStrings[i].update(this, instrumentState, tone, i, roundedSamplesPerTick, stringDecayStart, stringDecayEnd);
                    }
                }
            }
        }
        static getLFOAmplitude(instrument, secondsIntoBar) {
            let effect = 0.0;
            for (const vibratoPeriodSeconds of Config.vibratoTypes[instrument.vibratoType].periodsSeconds) {
                effect += Math.sin(Math.PI * 2.0 * secondsIntoBar / vibratoPeriodSeconds);
            }
            return effect;
        }
        static getInstrumentSynthFunction(instrument) {
            if (instrument.type == 1) {
                const fingerprint = instrument.algorithm + "_" + instrument.feedbackType;
                if (Synth.fmSynthFunctionCache[fingerprint] == undefined) {
                    const synthSource = [];
                    for (const line of Synth.fmSourceTemplate) {
                        if (line.indexOf("// CARRIER OUTPUTS") != -1) {
                            const outputs = [];
                            for (let j = 0; j < Config.algorithms[instrument.algorithm].carrierCount; j++) {
                                outputs.push("operator" + j + "Scaled");
                            }
                            synthSource.push(line.replace("/*operator#Scaled*/", outputs.join(" + ")));
                        }
                        else if (line.indexOf("// INSERT OPERATOR COMPUTATION HERE") != -1) {
                            for (let j = Config.operatorCount - 1; j >= 0; j--) {
                                for (const operatorLine of Synth.operatorSourceTemplate) {
                                    if (operatorLine.indexOf("/* + operator@Scaled*/") != -1) {
                                        let modulators = "";
                                        for (const modulatorNumber of Config.algorithms[instrument.algorithm].modulatedBy[j]) {
                                            modulators += " + operator" + (modulatorNumber - 1) + "Scaled";
                                        }
                                        const feedbackIndices = Config.feedbacks[instrument.feedbackType].indices[j];
                                        if (feedbackIndices.length > 0) {
                                            modulators += " + feedbackMult * (";
                                            const feedbacks = [];
                                            for (const modulatorNumber of feedbackIndices) {
                                                feedbacks.push("operator" + (modulatorNumber - 1) + "Output");
                                            }
                                            modulators += feedbacks.join(" + ") + ")";
                                        }
                                        synthSource.push(operatorLine.replace(/\#/g, j + "").replace("/* + operator@Scaled*/", modulators));
                                    }
                                    else {
                                        synthSource.push(operatorLine.replace(/\#/g, j + ""));
                                    }
                                }
                            }
                        }
                        else if (line.indexOf("#") != -1) {
                            for (let j = 0; j < Config.operatorCount; j++) {
                                synthSource.push(line.replace(/\#/g, j + ""));
                            }
                        }
                        else {
                            synthSource.push(line);
                        }
                    }
                    Synth.fmSynthFunctionCache[fingerprint] = new Function("synth", "bufferIndex", "roundedSamplesPerTick", "tone", "instrumentState", synthSource.join("\n"));
                }
                return Synth.fmSynthFunctionCache[fingerprint];
            }
            else if (instrument.type == 0) {
                return Synth.chipSynth;
            }
            else if (instrument.type == 8) {
                return Synth.chipSynth;
            }
            else if (instrument.type == 5) {
                return Synth.harmonicsSynth;
            }
            else if (instrument.type == 6) {
                return Synth.pulseWidthSynth;
            }
            else if (instrument.type == 7) {
                return Synth.pickedStringSynth;
            }
            else if (instrument.type == 2) {
                return Synth.noiseSynth;
            }
            else if (instrument.type == 3) {
                return Synth.spectrumSynth;
            }
            else if (instrument.type == 4) {
                return Synth.drumsetSynth;
            }
            else if (instrument.type == 9) {
                return Synth.modSynth;
            }
            else {
                throw new Error("Unrecognized instrument type: " + instrument.type);
            }
        }
        static chipSynth(synth, bufferIndex, roundedSamplesPerTick, tone, instrumentState) {
            const sign = instrumentState.invertWave ? -1 : 1;
            const aliases = (effectsIncludeDistortion(instrumentState.effects) && instrumentState.aliases);
            const data = synth.tempMonoInstrumentSampleBuffer;
            const wave = instrumentState.wave;
            const volumeScale = instrumentState.volumeScale;
            const waveLength = (aliases && instrumentState.type == 8) ? wave.length : wave.length - 1;
            const unisonSign = tone.specialIntervalExpressionMult * instrumentState.unison.sign;
            if (instrumentState.unison.voices == 1 && !instrumentState.chord.customInterval)
                tone.phases[1] = tone.phases[0];
            let phaseDeltaA = tone.phaseDeltas[0] * waveLength;
            let phaseDeltaB = tone.phaseDeltas[1] * waveLength;
            const phaseDeltaScaleA = +tone.phaseDeltaScales[0];
            const phaseDeltaScaleB = +tone.phaseDeltaScales[1];
            let expression = +tone.expression;
            const expressionDelta = +tone.expressionDelta;
            let phaseA = (tone.phases[0] % 1) * waveLength;
            let phaseB = (tone.phases[1] % 1) * waveLength;
            const filters = tone.noteFilters;
            const filterCount = tone.noteFilterCount | 0;
            let initialFilterInput1 = +tone.initialNoteFilterInput1;
            let initialFilterInput2 = +tone.initialNoteFilterInput2;
            const applyFilters = Synth.applyFilters;
            let prevWaveIntegralA = 0;
            let prevWaveIntegralB = 0;
            if (!aliases) {
                const phaseAInt = phaseA | 0;
                const phaseBInt = phaseB | 0;
                const indexA = phaseAInt % waveLength;
                const indexB = phaseBInt % waveLength;
                const phaseRatioA = phaseA - phaseAInt;
                const phaseRatioB = phaseB - phaseBInt;
                prevWaveIntegralA = +wave[indexA];
                prevWaveIntegralB = +wave[indexB];
                prevWaveIntegralA += (wave[indexA + 1] - prevWaveIntegralA) * phaseRatioA;
                prevWaveIntegralB += (wave[indexB + 1] - prevWaveIntegralB) * phaseRatioB;
            }
            const stopIndex = bufferIndex + roundedSamplesPerTick;
            for (let sampleIndex = bufferIndex; sampleIndex < stopIndex; sampleIndex++) {
                phaseA += phaseDeltaA;
                phaseB += phaseDeltaB;
                let waveA;
                let waveB;
                let inputSample;
                if (aliases) {
                    waveA = wave[(0 | phaseA) % waveLength];
                    waveB = wave[(0 | phaseB) % waveLength];
                    inputSample = waveA + waveB;
                }
                else {
                    const phaseAInt = phaseA | 0;
                    const phaseBInt = phaseB | 0;
                    const indexA = phaseAInt % waveLength;
                    const indexB = phaseBInt % waveLength;
                    let nextWaveIntegralA = wave[indexA];
                    let nextWaveIntegralB = wave[indexB];
                    const phaseRatioA = phaseA - phaseAInt;
                    const phaseRatioB = phaseB - phaseBInt;
                    nextWaveIntegralA += (wave[indexA + 1] - nextWaveIntegralA) * phaseRatioA;
                    nextWaveIntegralB += (wave[indexB + 1] - nextWaveIntegralB) * phaseRatioB;
                    waveA = (nextWaveIntegralA - prevWaveIntegralA) / phaseDeltaA;
                    waveB = (nextWaveIntegralB - prevWaveIntegralB) / phaseDeltaB;
                    prevWaveIntegralA = nextWaveIntegralA;
                    prevWaveIntegralB = nextWaveIntegralB;
                    inputSample = waveA + waveB * unisonSign;
                }
                inputSample *= sign;
                const sample = applyFilters(inputSample * volumeScale, initialFilterInput1, initialFilterInput2, filterCount, filters);
                initialFilterInput2 = initialFilterInput1;
                initialFilterInput1 = inputSample * volumeScale;
                phaseDeltaA *= phaseDeltaScaleA;
                phaseDeltaB *= phaseDeltaScaleB;
                const output = sample * expression;
                expression += expressionDelta;
                data[sampleIndex] += output;
            }
            tone.phases[0] = phaseA / waveLength;
            tone.phases[1] = phaseB / waveLength;
            tone.phaseDeltas[0] = phaseDeltaA / waveLength;
            tone.phaseDeltas[1] = phaseDeltaB / waveLength;
            tone.expression = expression;
            synth.sanitizeFilters(filters);
            tone.initialNoteFilterInput1 = initialFilterInput1;
            tone.initialNoteFilterInput2 = initialFilterInput2;
        }
        static harmonicsSynth(synth, bufferIndex, roundedSamplesPerTick, tone, instrumentState) {
            const sign = instrumentState.invertWave ? -1 : 1;
            const data = synth.tempMonoInstrumentSampleBuffer;
            const wave = instrumentState.wave;
            const waveLength = wave.length - 1;
            const unisonSign = tone.specialIntervalExpressionMult * instrumentState.unison.sign;
            if (instrumentState.unison.voices == 1 && !instrumentState.chord.customInterval)
                tone.phases[1] = tone.phases[0];
            let phaseDeltaA = tone.phaseDeltas[0] * waveLength;
            let phaseDeltaB = tone.phaseDeltas[1] * waveLength;
            const phaseDeltaScaleA = +tone.phaseDeltaScales[0];
            const phaseDeltaScaleB = +tone.phaseDeltaScales[1];
            let expression = +tone.expression;
            const expressionDelta = +tone.expressionDelta;
            let phaseA = (tone.phases[0] % 1) * waveLength;
            let phaseB = (tone.phases[1] % 1) * waveLength;
            const filters = tone.noteFilters;
            const filterCount = tone.noteFilterCount | 0;
            let initialFilterInput1 = +tone.initialNoteFilterInput1;
            let initialFilterInput2 = +tone.initialNoteFilterInput2;
            const applyFilters = Synth.applyFilters;
            const phaseAInt = phaseA | 0;
            const phaseBInt = phaseB | 0;
            const indexA = phaseAInt % waveLength;
            const indexB = phaseBInt % waveLength;
            const phaseRatioA = phaseA - phaseAInt;
            const phaseRatioB = phaseB - phaseBInt;
            let prevWaveIntegralA = +wave[indexA];
            let prevWaveIntegralB = +wave[indexB];
            prevWaveIntegralA += (wave[indexA + 1] - prevWaveIntegralA) * phaseRatioA;
            prevWaveIntegralB += (wave[indexB + 1] - prevWaveIntegralB) * phaseRatioB;
            const stopIndex = bufferIndex + roundedSamplesPerTick;
            for (let sampleIndex = bufferIndex; sampleIndex < stopIndex; sampleIndex++) {
                phaseA += phaseDeltaA;
                phaseB += phaseDeltaB;
                const phaseAInt = phaseA | 0;
                const phaseBInt = phaseB | 0;
                const indexA = phaseAInt % waveLength;
                const indexB = phaseBInt % waveLength;
                let nextWaveIntegralA = wave[indexA];
                let nextWaveIntegralB = wave[indexB];
                const phaseRatioA = phaseA - phaseAInt;
                const phaseRatioB = phaseB - phaseBInt;
                nextWaveIntegralA += (wave[indexA + 1] - nextWaveIntegralA) * phaseRatioA;
                nextWaveIntegralB += (wave[indexB + 1] - nextWaveIntegralB) * phaseRatioB;
                const waveA = (nextWaveIntegralA - prevWaveIntegralA) / phaseDeltaA;
                const waveB = (nextWaveIntegralB - prevWaveIntegralB) / phaseDeltaB;
                prevWaveIntegralA = nextWaveIntegralA;
                prevWaveIntegralB = nextWaveIntegralB;
                const inputSample = waveA + waveB * unisonSign * sign;
                const sample = applyFilters(inputSample, initialFilterInput1, initialFilterInput2, filterCount, filters);
                initialFilterInput2 = initialFilterInput1;
                initialFilterInput1 = inputSample;
                phaseDeltaA *= phaseDeltaScaleA;
                phaseDeltaB *= phaseDeltaScaleB;
                const output = sample * expression;
                expression += expressionDelta;
                data[sampleIndex] += output;
            }
            tone.phases[0] = phaseA / waveLength;
            tone.phases[1] = phaseB / waveLength;
            tone.phaseDeltas[0] = phaseDeltaA / waveLength;
            tone.phaseDeltas[1] = phaseDeltaB / waveLength;
            tone.expression = expression;
            synth.sanitizeFilters(filters);
            tone.initialNoteFilterInput1 = initialFilterInput1;
            tone.initialNoteFilterInput2 = initialFilterInput2;
        }
        static pickedStringSynth(synth, bufferIndex, roundedSamplesPerTick, tone, instrumentState) {
            const voiceCount = instrumentState.unison.voices;
            let pickedStringFunction = Synth.pickedStringFunctionCache[voiceCount];
            if (pickedStringFunction == undefined) {
                let pickedStringSource = "";
                pickedStringSource += `
                const sign = instrumentState.invertWave ? -1 : 1;
				const Config = beepbox.Config;
				const Synth = beepbox.Synth;
				const data = synth.tempMonoInstrumentSampleBuffer;

				let pickedString# = tone.pickedStrings[#];
				let allPassSample# = +pickedString#.allPassSample;
				let allPassPrevInput# = +pickedString#.allPassPrevInput;
				let shelfSample# = +pickedString#.shelfSample;
				let shelfPrevInput# = +pickedString#.shelfPrevInput;
				let fractionalDelaySample# = +pickedString#.fractionalDelaySample;
				const delayLine# = pickedString#.delayLine;
				const delayBufferMask# = (delayLine#.length - 1) >> 0;
				let delayIndex# = pickedString#.delayIndex|0;
				delayIndex# = (delayIndex# & delayBufferMask#) + delayLine#.length;
				let delayLength# = +pickedString#.prevDelayLength;
				const delayLengthDelta# = +pickedString#.delayLengthDelta;
				let allPassG# = +pickedString#.allPassG;
				let shelfA1# = +pickedString#.shelfA1;
				let shelfB0# = +pickedString#.shelfB0;
				let shelfB1# = +pickedString#.shelfB1;
				const allPassGDelta# = +pickedString#.allPassGDelta;
				const shelfA1Delta# = +pickedString#.shelfA1Delta;
				const shelfB0Delta# = +pickedString#.shelfB0Delta;
				const shelfB1Delta# = +pickedString#.shelfB1Delta;

				let expression = +tone.expression;
				const expressionDelta = +tone.expressionDelta;

				const unisonSign = tone.specialIntervalExpressionMult * instrumentState.unison.sign;
				const delayResetOffset# = pickedString#.delayResetOffset|0;

				const filters = tone.noteFilters;
				const filterCount = tone.noteFilterCount|0;
				let initialFilterInput1 = +tone.initialNoteFilterInput1;
				let initialFilterInput2 = +tone.initialNoteFilterInput2;
				const applyFilters = Synth.applyFilters;

				const stopIndex = bufferIndex + runLength;
				for (let sampleIndex = bufferIndex; sampleIndex < stopIndex; sampleIndex++) {
					const targetSampleTime# = delayIndex# - delayLength#;
					const lowerIndex# = (targetSampleTime# + 0.125) | 0; // Offset to improve stability of all-pass filter.
					const upperIndex# = lowerIndex# + 1;
					const fractionalDelay# = upperIndex# - targetSampleTime#;
					const fractionalDelayG# = (1.0 - fractionalDelay#) / (1.0 + fractionalDelay#); // Inlined version of FilterCoefficients.prototype.allPass1stOrderFractionalDelay
					const prevInput# = delayLine#[lowerIndex# & delayBufferMask#];
					const input# = delayLine#[upperIndex# & delayBufferMask#];
					fractionalDelaySample# = fractionalDelayG# * input# + prevInput# - fractionalDelayG# * fractionalDelaySample#;

					allPassSample# = fractionalDelaySample# * allPassG# + allPassPrevInput# - allPassG# * allPassSample#;
					allPassPrevInput# = fractionalDelaySample#;

					shelfSample# = shelfB0# * allPassSample# + shelfB1# * shelfPrevInput# - shelfA1# * shelfSample#;
					shelfPrevInput# = allPassSample#;

					delayLine#[delayIndex# & delayBufferMask#] += shelfSample#;
					delayLine#[(delayIndex# + delayResetOffset#) & delayBufferMask#] = 0.0;
					delayIndex#++;

					const inputSample = (`;
                const sampleList = [];
                for (let voice = 0; voice < voiceCount; voice++) {
                    sampleList.push("fractionalDelaySample" + voice + (voice == 1 ? " * unisonSign" : ""));
                }
                pickedStringSource += sampleList.join(" + ");
                pickedStringSource += `) * expression * sign;
					const sample = applyFilters(inputSample, initialFilterInput1, initialFilterInput2, filterCount, filters);
					initialFilterInput2 = initialFilterInput1;
					initialFilterInput1 = inputSample;
					data[sampleIndex] += sample;

					expression += expressionDelta;
					delayLength# += delayLengthDelta#;
					allPassG# += allPassGDelta#;
					shelfA1# += shelfA1Delta#;
					shelfB0# += shelfB0Delta#;
					shelfB1# += shelfB1Delta#;
				}

				// Avoid persistent denormal or NaN values in the delay buffers and filter history.
				const epsilon = (1.0e-24);
				if (!Number.isFinite(allPassSample#) || Math.abs(allPassSample#) < epsilon) allPassSample# = 0.0;
				if (!Number.isFinite(allPassPrevInput#) || Math.abs(allPassPrevInput#) < epsilon) allPassPrevInput# = 0.0;
				if (!Number.isFinite(shelfSample#) || Math.abs(shelfSample#) < epsilon) shelfSample# = 0.0;
				if (!Number.isFinite(shelfPrevInput#) || Math.abs(shelfPrevInput#) < epsilon) shelfPrevInput# = 0.0;
				if (!Number.isFinite(fractionalDelaySample#) || Math.abs(fractionalDelaySample#) < epsilon) fractionalDelaySample# = 0.0;
				pickedString#.allPassSample = allPassSample#;
				pickedString#.allPassPrevInput = allPassPrevInput#;
				pickedString#.shelfSample = shelfSample#;
				pickedString#.shelfPrevInput = shelfPrevInput#;
				pickedString#.fractionalDelaySample = fractionalDelaySample#;
				pickedString#.delayIndex = delayIndex#;
				pickedString#.prevDelayLength = delayLength#;
				pickedString#.allPassG = allPassG#;
				pickedString#.shelfA1 = shelfA1#;
				pickedString#.shelfB0 = shelfB0#;
				pickedString#.shelfB1 = shelfB1#;

				tone.expression = expression;

				synth.sanitizeFilters(filters);
				tone.initialNoteFilterInput1 = initialFilterInput1;
				tone.initialNoteFilterInput2 = initialFilterInput2;`;
                pickedStringSource = pickedStringSource.replace(/^.*\#.*$/mg, line => {
                    const lines = [];
                    for (let voice = 0; voice < voiceCount; voice++) {
                        lines.push(line.replace(/\#/g, String(voice)));
                    }
                    return lines.join("\n");
                });
                pickedStringFunction = new Function("synth", "bufferIndex", "runLength", "tone", "instrumentState", pickedStringSource);
                Synth.pickedStringFunctionCache[voiceCount] = pickedStringFunction;
            }
            pickedStringFunction(synth, bufferIndex, roundedSamplesPerTick, tone, instrumentState);
        }
        static effectsSynth(synth, outputDataL, outputDataR, bufferIndex, runLength, instrumentState) {
            const usesDistortion = effectsIncludeDistortion(instrumentState.effects);
            const usesBitcrusher = effectsIncludeBitcrusher(instrumentState.effects);
            const usesEqFilter = instrumentState.eqFilterCount > 0;
            const usesPanning = effectsIncludePanning(instrumentState.effects);
            const usesChorus = effectsIncludeChorus(instrumentState.effects);
            const usesEcho = effectsIncludeEcho(instrumentState.effects);
            const usesReverb = effectsIncludeReverb(instrumentState.effects);
            let signature = 0;
            if (usesDistortion)
                signature = signature | 1;
            signature = signature << 1;
            if (usesBitcrusher)
                signature = signature | 1;
            signature = signature << 1;
            if (usesEqFilter)
                signature = signature | 1;
            signature = signature << 1;
            if (usesPanning)
                signature = signature | 1;
            signature = signature << 1;
            if (usesChorus)
                signature = signature | 1;
            signature = signature << 1;
            if (usesEcho)
                signature = signature | 1;
            signature = signature << 1;
            if (usesReverb)
                signature = signature | 1;
            let effectsFunction = Synth.effectsFunctionCache[signature];
            if (effectsFunction == undefined) {
                let effectsSource = "";
                const usesDelays = usesChorus || usesReverb || usesEcho;
                effectsSource += `
				const Config = beepbox.Config;
				const tempMonoInstrumentSampleBuffer = synth.tempMonoInstrumentSampleBuffer;

				let mixVolume = +instrumentState.mixVolume;
				const mixVolumeDelta = +instrumentState.mixVolumeDelta;`;
                if (usesDelays) {
                    effectsSource += `

				let delayInputMult = +instrumentState.delayInputMult;
				const delayInputMultDelta = +instrumentState.delayInputMultDelta;`;
                }
                if (usesDistortion) {
                    effectsSource += `

				const distortionBaseVolume = +Config.distortionBaseVolume;
				let distortion = instrumentState.distortion;
				const distortionDelta = instrumentState.distortionDelta;
				let distortionDrive = instrumentState.distortionDrive;
				const distortionDriveDelta = instrumentState.distortionDriveDelta;
				const distortionFractionalResolution = 4.0;
				const distortionOversampleCompensation = distortionBaseVolume / distortionFractionalResolution;
				const distortionFractionalDelay1 = 1.0 / distortionFractionalResolution;
				const distortionFractionalDelay2 = 2.0 / distortionFractionalResolution;
				const distortionFractionalDelay3 = 3.0 / distortionFractionalResolution;
				const distortionFractionalDelayG1 = (1.0 - distortionFractionalDelay1) / (1.0 + distortionFractionalDelay1); // Inlined version of FilterCoefficients.prototype.allPass1stOrderFractionalDelay
				const distortionFractionalDelayG2 = (1.0 - distortionFractionalDelay2) / (1.0 + distortionFractionalDelay2); // Inlined version of FilterCoefficients.prototype.allPass1stOrderFractionalDelay
				const distortionFractionalDelayG3 = (1.0 - distortionFractionalDelay3) / (1.0 + distortionFractionalDelay3); // Inlined version of FilterCoefficients.prototype.allPass1stOrderFractionalDelay
				const distortionNextOutputWeight1 = Math.cos(Math.PI * distortionFractionalDelay1) * 0.5 + 0.5;
				const distortionNextOutputWeight2 = Math.cos(Math.PI * distortionFractionalDelay2) * 0.5 + 0.5;
				const distortionNextOutputWeight3 = Math.cos(Math.PI * distortionFractionalDelay3) * 0.5 + 0.5;
				const distortionPrevOutputWeight1 = 1.0 - distortionNextOutputWeight1;
				const distortionPrevOutputWeight2 = 1.0 - distortionNextOutputWeight2;
				const distortionPrevOutputWeight3 = 1.0 - distortionNextOutputWeight3;

				let distortionFractionalInput1 = +instrumentState.distortionFractionalInput1;
				let distortionFractionalInput2 = +instrumentState.distortionFractionalInput2;
				let distortionFractionalInput3 = +instrumentState.distortionFractionalInput3;
				let distortionPrevInput = +instrumentState.distortionPrevInput;
				let distortionNextOutput = +instrumentState.distortionNextOutput;`;
                }
                if (usesBitcrusher) {
                    effectsSource += `

				let bitcrusherPrevInput = +instrumentState.bitcrusherPrevInput;
				let bitcrusherCurrentOutput = +instrumentState.bitcrusherCurrentOutput;
				let bitcrusherPhase = +instrumentState.bitcrusherPhase;
				let bitcrusherPhaseDelta = +instrumentState.bitcrusherPhaseDelta;
				const bitcrusherPhaseDeltaScale = +instrumentState.bitcrusherPhaseDeltaScale;
				let bitcrusherScale = +instrumentState.bitcrusherScale;
				const bitcrusherScaleScale = +instrumentState.bitcrusherScaleScale;
				let bitcrusherFoldLevel = +instrumentState.bitcrusherFoldLevel;
				const bitcrusherFoldLevelScale = +instrumentState.bitcrusherFoldLevelScale;`;
                }
                if (usesEqFilter) {
                    effectsSource += `

				let filters = instrumentState.eqFilters;
				const filterCount = instrumentState.eqFilterCount|0;
				let initialFilterInput1 = +instrumentState.initialEqFilterInput1;
				let initialFilterInput2 = +instrumentState.initialEqFilterInput2;
				const applyFilters = beepbox.Synth.applyFilters;`;
                }
                effectsSource += `

				let eqFilterVolume = +instrumentState.eqFilterVolume;
				const eqFilterVolumeDelta = +instrumentState.eqFilterVolumeDelta;`;
                if (usesPanning) {
                    effectsSource += `

				const panningMask = synth.panningDelayBufferMask >>> 0;
				const panningDelayLine = instrumentState.panningDelayLine;
				let panningDelayPos = instrumentState.panningDelayPos & panningMask;
				let   panningVolumeL      = +instrumentState.panningVolumeL;
				let   panningVolumeR      = +instrumentState.panningVolumeR;
				const panningVolumeDeltaL = +instrumentState.panningVolumeDeltaL;
				const panningVolumeDeltaR = +instrumentState.panningVolumeDeltaR;
				let   panningOffsetL      = +instrumentState.panningOffsetL;
				let   panningOffsetR      = +instrumentState.panningOffsetR;
				const panningOffsetDeltaL = 1.0 - instrumentState.panningOffsetDeltaL;
				const panningOffsetDeltaR = 1.0 - instrumentState.panningOffsetDeltaR;`;
                }
                if (usesChorus) {
                    effectsSource += `

				const chorusMask = synth.chorusDelayBufferMask >>> 0;
				const chorusDelayLineL = instrumentState.chorusDelayLineL;
				const chorusDelayLineR = instrumentState.chorusDelayLineR;
				instrumentState.chorusDelayLineDirty = true;
				let chorusDelayPos = instrumentState.chorusDelayPos & chorusMask;

				let chorusVoiceMult = +instrumentState.chorusVoiceMult;
				const chorusVoiceMultDelta = +instrumentState.chorusVoiceMultDelta;
				let chorusCombinedMult = +instrumentState.chorusCombinedMult;
				const chorusCombinedMultDelta = +instrumentState.chorusCombinedMultDelta;

				const chorusDuration = +beepbox.Config.chorusPeriodSeconds;
				const chorusAngle = Math.PI * 2.0 / (chorusDuration * synth.samplesPerSecond);
				const chorusRange = synth.samplesPerSecond * beepbox.Config.chorusDelayRange;
				const chorusOffset0 = synth.chorusDelayBufferSize - beepbox.Config.chorusDelayOffsets[0][0] * chorusRange;
				const chorusOffset1 = synth.chorusDelayBufferSize - beepbox.Config.chorusDelayOffsets[0][1] * chorusRange;
				const chorusOffset2 = synth.chorusDelayBufferSize - beepbox.Config.chorusDelayOffsets[0][2] * chorusRange;
				const chorusOffset3 = synth.chorusDelayBufferSize - beepbox.Config.chorusDelayOffsets[1][0] * chorusRange;
				const chorusOffset4 = synth.chorusDelayBufferSize - beepbox.Config.chorusDelayOffsets[1][1] * chorusRange;
				const chorusOffset5 = synth.chorusDelayBufferSize - beepbox.Config.chorusDelayOffsets[1][2] * chorusRange;
				let chorusPhase = instrumentState.chorusPhase % (Math.PI * 2.0);
				let chorusTap0Index = chorusDelayPos + chorusOffset0 - chorusRange * Math.sin(chorusPhase + beepbox.Config.chorusPhaseOffsets[0][0]);
				let chorusTap1Index = chorusDelayPos + chorusOffset1 - chorusRange * Math.sin(chorusPhase + beepbox.Config.chorusPhaseOffsets[0][1]);
				let chorusTap2Index = chorusDelayPos + chorusOffset2 - chorusRange * Math.sin(chorusPhase + beepbox.Config.chorusPhaseOffsets[0][2]);
				let chorusTap3Index = chorusDelayPos + chorusOffset3 - chorusRange * Math.sin(chorusPhase + beepbox.Config.chorusPhaseOffsets[1][0]);
				let chorusTap4Index = chorusDelayPos + chorusOffset4 - chorusRange * Math.sin(chorusPhase + beepbox.Config.chorusPhaseOffsets[1][1]);
				let chorusTap5Index = chorusDelayPos + chorusOffset5 - chorusRange * Math.sin(chorusPhase + beepbox.Config.chorusPhaseOffsets[1][2]);
				chorusPhase += chorusAngle * runLength;
				const chorusTap0End = chorusDelayPos + chorusOffset0 - chorusRange * Math.sin(chorusPhase + beepbox.Config.chorusPhaseOffsets[0][0]) + runLength;
				const chorusTap1End = chorusDelayPos + chorusOffset1 - chorusRange * Math.sin(chorusPhase + beepbox.Config.chorusPhaseOffsets[0][1]) + runLength;
				const chorusTap2End = chorusDelayPos + chorusOffset2 - chorusRange * Math.sin(chorusPhase + beepbox.Config.chorusPhaseOffsets[0][2]) + runLength;
				const chorusTap3End = chorusDelayPos + chorusOffset3 - chorusRange * Math.sin(chorusPhase + beepbox.Config.chorusPhaseOffsets[1][0]) + runLength;
				const chorusTap4End = chorusDelayPos + chorusOffset4 - chorusRange * Math.sin(chorusPhase + beepbox.Config.chorusPhaseOffsets[1][1]) + runLength;
				const chorusTap5End = chorusDelayPos + chorusOffset5 - chorusRange * Math.sin(chorusPhase + beepbox.Config.chorusPhaseOffsets[1][2]) + runLength;
				const chorusTap0Delta = (chorusTap0End - chorusTap0Index) / runLength;
				const chorusTap1Delta = (chorusTap1End - chorusTap1Index) / runLength;
				const chorusTap2Delta = (chorusTap2End - chorusTap2Index) / runLength;
				const chorusTap3Delta = (chorusTap3End - chorusTap3Index) / runLength;
				const chorusTap4Delta = (chorusTap4End - chorusTap4Index) / runLength;
				const chorusTap5Delta = (chorusTap5End - chorusTap5Index) / runLength;`;
                }
                if (usesEcho) {
                    effectsSource += `

				let echoMult = +instrumentState.echoMult;
				const echoMultDelta = +instrumentState.echoMultDelta;

				const echoDelayLineL = instrumentState.echoDelayLineL;
				const echoDelayLineR = instrumentState.echoDelayLineR;
				const echoMask = (echoDelayLineL.length - 1) >>> 0;
				instrumentState.echoDelayLineDirty = true;

				let echoDelayPos = instrumentState.echoDelayPos & echoMask;
				const echoDelayOffsetStart = (echoDelayLineL.length - instrumentState.echoDelayOffsetStart) & echoMask;
				const echoDelayOffsetEnd   = (echoDelayLineL.length - instrumentState.echoDelayOffsetEnd) & echoMask;
				let echoDelayOffsetRatio = +instrumentState.echoDelayOffsetRatio;
				const echoDelayOffsetRatioDelta = +instrumentState.echoDelayOffsetRatioDelta;

				const echoShelfA1 = +instrumentState.echoShelfA1;
				const echoShelfB0 = +instrumentState.echoShelfB0;
				const echoShelfB1 = +instrumentState.echoShelfB1;
				let echoShelfSampleL = +instrumentState.echoShelfSampleL;
				let echoShelfSampleR = +instrumentState.echoShelfSampleR;
				let echoShelfPrevInputL = +instrumentState.echoShelfPrevInputL;
				let echoShelfPrevInputR = +instrumentState.echoShelfPrevInputR;`;
                }
                if (usesReverb) {
                    effectsSource += `

				const reverbMask = Config.reverbDelayBufferMask >>> 0; //TODO: Dynamic reverb buffer size.
				const reverbDelayLine = instrumentState.reverbDelayLine;
				instrumentState.reverbDelayLineDirty = true;
				let reverbDelayPos = instrumentState.reverbDelayPos & reverbMask;

				let reverb = +instrumentState.reverbMult;
				const reverbDelta = +instrumentState.reverbMultDelta;

				const reverbShelfA1 = +instrumentState.reverbShelfA1;
				const reverbShelfB0 = +instrumentState.reverbShelfB0;
				const reverbShelfB1 = +instrumentState.reverbShelfB1;
				let reverbShelfSample0 = +instrumentState.reverbShelfSample0;
				let reverbShelfSample1 = +instrumentState.reverbShelfSample1;
				let reverbShelfSample2 = +instrumentState.reverbShelfSample2;
				let reverbShelfSample3 = +instrumentState.reverbShelfSample3;
				let reverbShelfPrevInput0 = +instrumentState.reverbShelfPrevInput0;
				let reverbShelfPrevInput1 = +instrumentState.reverbShelfPrevInput1;
				let reverbShelfPrevInput2 = +instrumentState.reverbShelfPrevInput2;
				let reverbShelfPrevInput3 = +instrumentState.reverbShelfPrevInput3;`;
                }
                effectsSource += `

				const stopIndex = bufferIndex + runLength;
				for (let sampleIndex = bufferIndex; sampleIndex < stopIndex; sampleIndex++) {
					let sample = tempMonoInstrumentSampleBuffer[sampleIndex];
					tempMonoInstrumentSampleBuffer[sampleIndex] = 0.0;`;
                if (usesDistortion) {
                    effectsSource += `

					const distortionReverse = 1.0 - distortion;
					const distortionNextInput = sample * distortionDrive;
					sample = distortionNextOutput;
					distortionNextOutput = distortionNextInput / (distortionReverse * Math.abs(distortionNextInput) + distortion);
					distortionFractionalInput1 = distortionFractionalDelayG1 * distortionNextInput + distortionPrevInput - distortionFractionalDelayG1 * distortionFractionalInput1;
					distortionFractionalInput2 = distortionFractionalDelayG2 * distortionNextInput + distortionPrevInput - distortionFractionalDelayG2 * distortionFractionalInput2;
					distortionFractionalInput3 = distortionFractionalDelayG3 * distortionNextInput + distortionPrevInput - distortionFractionalDelayG3 * distortionFractionalInput3;
					const distortionOutput1 = distortionFractionalInput1 / (distortionReverse * Math.abs(distortionFractionalInput1) + distortion);
					const distortionOutput2 = distortionFractionalInput2 / (distortionReverse * Math.abs(distortionFractionalInput2) + distortion);
					const distortionOutput3 = distortionFractionalInput3 / (distortionReverse * Math.abs(distortionFractionalInput3) + distortion);
					distortionNextOutput += distortionOutput1 * distortionNextOutputWeight1 + distortionOutput2 * distortionNextOutputWeight2 + distortionOutput3 * distortionNextOutputWeight3;
					sample += distortionOutput1 * distortionPrevOutputWeight1 + distortionOutput2 * distortionPrevOutputWeight2 + distortionOutput3 * distortionPrevOutputWeight3;
					sample *= distortionOversampleCompensation;
					distortionPrevInput = distortionNextInput;
					distortion += distortionDelta;
					distortionDrive += distortionDriveDelta;`;
                }
                if (usesBitcrusher) {
                    effectsSource += `

					bitcrusherPhase += bitcrusherPhaseDelta;
					if (bitcrusherPhase < 1.0) {
						bitcrusherPrevInput = sample;
						sample = bitcrusherCurrentOutput;
					} else {
						bitcrusherPhase = bitcrusherPhase % 1.0;
						const ratio = bitcrusherPhase / bitcrusherPhaseDelta;

						const lerpedInput = sample + (bitcrusherPrevInput - sample) * ratio;
						bitcrusherPrevInput = sample;

						const bitcrusherWrapLevel = bitcrusherFoldLevel * 4.0;
						const wrappedSample = (((lerpedInput + bitcrusherFoldLevel) % bitcrusherWrapLevel) + bitcrusherWrapLevel) % bitcrusherWrapLevel;
						const foldedSample = bitcrusherFoldLevel - Math.abs(bitcrusherFoldLevel * 2.0 - wrappedSample);
						const scaledSample = foldedSample / bitcrusherScale;
						const oldValue = bitcrusherCurrentOutput;
						const newValue = (((scaledSample > 0 ? scaledSample + 1 : scaledSample)|0)-.5) * bitcrusherScale;

						sample = oldValue + (newValue - oldValue) * ratio;
						bitcrusherCurrentOutput = newValue;
					}
					bitcrusherPhaseDelta *= bitcrusherPhaseDeltaScale;
					bitcrusherScale *= bitcrusherScaleScale;
					bitcrusherFoldLevel *= bitcrusherFoldLevelScale;`;
                }
                if (usesEqFilter) {
                    effectsSource += `

					const inputSample = sample;
					sample = applyFilters(inputSample, initialFilterInput1, initialFilterInput2, filterCount, filters);
					initialFilterInput2 = initialFilterInput1;
					initialFilterInput1 = inputSample;`;
                }
                effectsSource += `

					sample *= eqFilterVolume;
					eqFilterVolume += eqFilterVolumeDelta;`;
                if (usesPanning) {
                    effectsSource += `

					panningDelayLine[panningDelayPos] = sample;
					const panningRatioL  = panningOffsetL % 1;
					const panningRatioR  = panningOffsetR % 1;
					const panningTapLA   = panningDelayLine[(panningOffsetL) & panningMask];
					const panningTapLB   = panningDelayLine[(panningOffsetL + 1) & panningMask];
					const panningTapRA   = panningDelayLine[(panningOffsetR) & panningMask];
					const panningTapRB   = panningDelayLine[(panningOffsetR + 1) & panningMask];
					const panningTapL    = panningTapLA + (panningTapLB - panningTapLA) * panningRatioL;
					const panningTapR    = panningTapRA + (panningTapRB - panningTapRA) * panningRatioR;
					let sampleL = panningTapL * panningVolumeL;
					let sampleR = panningTapR * panningVolumeR;
					panningDelayPos = (panningDelayPos + 1) & panningMask;
					panningVolumeL += panningVolumeDeltaL;
					panningVolumeR += panningVolumeDeltaR;
					panningOffsetL += panningOffsetDeltaL;
					panningOffsetR += panningOffsetDeltaR;`;
                }
                else {
                    effectsSource += `

					let sampleL = sample;
					let sampleR = sample;`;
                }
                if (usesChorus) {
                    effectsSource += `

					const chorusTap0Ratio = chorusTap0Index % 1;
					const chorusTap1Ratio = chorusTap1Index % 1;
					const chorusTap2Ratio = chorusTap2Index % 1;
					const chorusTap3Ratio = chorusTap3Index % 1;
					const chorusTap4Ratio = chorusTap4Index % 1;
					const chorusTap5Ratio = chorusTap5Index % 1;
					const chorusTap0A = chorusDelayLineL[(chorusTap0Index) & chorusMask];
					const chorusTap0B = chorusDelayLineL[(chorusTap0Index + 1) & chorusMask];
					const chorusTap1A = chorusDelayLineL[(chorusTap1Index) & chorusMask];
					const chorusTap1B = chorusDelayLineL[(chorusTap1Index + 1) & chorusMask];
					const chorusTap2A = chorusDelayLineL[(chorusTap2Index) & chorusMask];
					const chorusTap2B = chorusDelayLineL[(chorusTap2Index + 1) & chorusMask];
					const chorusTap3A = chorusDelayLineR[(chorusTap3Index) & chorusMask];
					const chorusTap3B = chorusDelayLineR[(chorusTap3Index + 1) & chorusMask];
					const chorusTap4A = chorusDelayLineR[(chorusTap4Index) & chorusMask];
					const chorusTap4B = chorusDelayLineR[(chorusTap4Index + 1) & chorusMask];
					const chorusTap5A = chorusDelayLineR[(chorusTap5Index) & chorusMask];
					const chorusTap5B = chorusDelayLineR[(chorusTap5Index + 1) & chorusMask];
					const chorusTap0 = chorusTap0A + (chorusTap0B - chorusTap0A) * chorusTap0Ratio;
					const chorusTap1 = chorusTap1A + (chorusTap1B - chorusTap1A) * chorusTap1Ratio;
					const chorusTap2 = chorusTap2A + (chorusTap2B - chorusTap2A) * chorusTap2Ratio;
					const chorusTap3 = chorusTap3A + (chorusTap3B - chorusTap3A) * chorusTap3Ratio;
					const chorusTap4 = chorusTap4A + (chorusTap4B - chorusTap4A) * chorusTap4Ratio;
					const chorusTap5 = chorusTap5A + (chorusTap5B - chorusTap5A) * chorusTap5Ratio;
					chorusDelayLineL[chorusDelayPos] = sampleL * delayInputMult;
					chorusDelayLineR[chorusDelayPos] = sampleR * delayInputMult;
					sampleL = chorusCombinedMult * (sampleL + chorusVoiceMult * (chorusTap1 - chorusTap0 - chorusTap2));
					sampleR = chorusCombinedMult * (sampleR + chorusVoiceMult * (chorusTap4 - chorusTap3 - chorusTap5));
					chorusDelayPos = (chorusDelayPos + 1) & chorusMask;
					chorusTap0Index += chorusTap0Delta;
					chorusTap1Index += chorusTap1Delta;
					chorusTap2Index += chorusTap2Delta;
					chorusTap3Index += chorusTap3Delta;
					chorusTap4Index += chorusTap4Delta;
					chorusTap5Index += chorusTap5Delta;
					chorusVoiceMult += chorusVoiceMultDelta;
					chorusCombinedMult += chorusCombinedMultDelta;`;
                }
                if (usesEcho) {
                    effectsSource += `

					const echoTapStartIndex = (echoDelayPos + echoDelayOffsetStart) & echoMask;
					const echoTapEndIndex   = (echoDelayPos + echoDelayOffsetEnd  ) & echoMask;
					const echoTapStartL = echoDelayLineL[echoTapStartIndex];
					const echoTapEndL   = echoDelayLineL[echoTapEndIndex];
					const echoTapStartR = echoDelayLineR[echoTapStartIndex];
					const echoTapEndR   = echoDelayLineR[echoTapEndIndex];
					const echoTapL = (echoTapStartL + (echoTapEndL - echoTapStartL) * echoDelayOffsetRatio) * echoMult;
					const echoTapR = (echoTapStartR + (echoTapEndR - echoTapStartR) * echoDelayOffsetRatio) * echoMult;

					echoShelfSampleL = echoShelfB0 * echoTapL + echoShelfB1 * echoShelfPrevInputL - echoShelfA1 * echoShelfSampleL;
					echoShelfSampleR = echoShelfB0 * echoTapR + echoShelfB1 * echoShelfPrevInputR - echoShelfA1 * echoShelfSampleR;
					echoShelfPrevInputL = echoTapL;
					echoShelfPrevInputR = echoTapR;
					sampleL += echoShelfSampleL;
					sampleR += echoShelfSampleR;

					echoDelayLineL[echoDelayPos] = sampleL * delayInputMult;
					echoDelayLineR[echoDelayPos] = sampleR * delayInputMult;
					echoDelayPos = (echoDelayPos + 1) & echoMask;
					echoDelayOffsetRatio += echoDelayOffsetRatioDelta;
					echoMult += echoMultDelta;
                    `;
                }
                if (usesReverb) {
                    effectsSource += `

					// Reverb, implemented using a feedback delay network with a Hadamard matrix and lowpass filters.
					// good ratios:    0.555235 + 0.618033 + 0.818 +   1.0 = 2.991268
					// Delay lengths:  3041     + 3385     + 4481  +  5477 = 16384 = 2^14
					// Buffer offsets: 3041    -> 6426   -> 10907 -> 16384
					const reverbDelayPos1 = (reverbDelayPos +  3041) & reverbMask;
					const reverbDelayPos2 = (reverbDelayPos +  6426) & reverbMask;
					const reverbDelayPos3 = (reverbDelayPos + 10907) & reverbMask;
					const reverbSample0 = (reverbDelayLine[reverbDelayPos]);
					const reverbSample1 = reverbDelayLine[reverbDelayPos1];
					const reverbSample2 = reverbDelayLine[reverbDelayPos2];
					const reverbSample3 = reverbDelayLine[reverbDelayPos3];
					const reverbTemp0 = -(reverbSample0 + sampleL) + reverbSample1;
					const reverbTemp1 = -(reverbSample0 + sampleR) - reverbSample1;
					const reverbTemp2 = -reverbSample2 + reverbSample3;
					const reverbTemp3 = -reverbSample2 - reverbSample3;
					const reverbShelfInput0 = (reverbTemp0 + reverbTemp2) * reverb;
					const reverbShelfInput1 = (reverbTemp1 + reverbTemp3) * reverb;
					const reverbShelfInput2 = (reverbTemp0 - reverbTemp2) * reverb;
					const reverbShelfInput3 = (reverbTemp1 - reverbTemp3) * reverb;
					reverbShelfSample0 = reverbShelfB0 * reverbShelfInput0 + reverbShelfB1 * reverbShelfPrevInput0 - reverbShelfA1 * reverbShelfSample0;
					reverbShelfSample1 = reverbShelfB0 * reverbShelfInput1 + reverbShelfB1 * reverbShelfPrevInput1 - reverbShelfA1 * reverbShelfSample1;
					reverbShelfSample2 = reverbShelfB0 * reverbShelfInput2 + reverbShelfB1 * reverbShelfPrevInput2 - reverbShelfA1 * reverbShelfSample2;
					reverbShelfSample3 = reverbShelfB0 * reverbShelfInput3 + reverbShelfB1 * reverbShelfPrevInput3 - reverbShelfA1 * reverbShelfSample3;
					reverbShelfPrevInput0 = reverbShelfInput0;
					reverbShelfPrevInput1 = reverbShelfInput1;
					reverbShelfPrevInput2 = reverbShelfInput2;
					reverbShelfPrevInput3 = reverbShelfInput3;
					reverbDelayLine[reverbDelayPos1] = reverbShelfSample0 * delayInputMult;
					reverbDelayLine[reverbDelayPos2] = reverbShelfSample1 * delayInputMult;
					reverbDelayLine[reverbDelayPos3] = reverbShelfSample2 * delayInputMult;
					reverbDelayLine[reverbDelayPos ] = reverbShelfSample3 * delayInputMult;
					reverbDelayPos = (reverbDelayPos + 1) & reverbMask;
					sampleL += reverbSample1 + reverbSample2 + reverbSample3;
					sampleR += reverbSample0 + reverbSample2 - reverbSample3;
					reverb += reverbDelta;`;
                }
                effectsSource += `

					outputDataL[sampleIndex] += sampleL * mixVolume;
					outputDataR[sampleIndex] += sampleR * mixVolume;
					mixVolume += mixVolumeDelta;`;
                if (usesDelays) {
                    effectsSource += `

					delayInputMult += delayInputMultDelta;`;
                }
                effectsSource += `
				}

				instrumentState.mixVolume = mixVolume;
				instrumentState.eqFilterVolume = eqFilterVolume;

				// Avoid persistent denormal or NaN values in the delay buffers and filter history.
				const epsilon = (1.0e-24);`;
                if (usesDelays) {
                    effectsSource += `

				instrumentState.delayInputMult = delayInputMult;`;
                }
                if (usesDistortion) {
                    effectsSource += `

				instrumentState.distortion = distortion;
				instrumentState.distortionDrive = distortionDrive;

				if (!Number.isFinite(distortionFractionalInput1) || Math.abs(distortionFractionalInput1) < epsilon) distortionFractionalInput1 = 0.0;
				if (!Number.isFinite(distortionFractionalInput2) || Math.abs(distortionFractionalInput2) < epsilon) distortionFractionalInput2 = 0.0;
				if (!Number.isFinite(distortionFractionalInput3) || Math.abs(distortionFractionalInput3) < epsilon) distortionFractionalInput3 = 0.0;
				if (!Number.isFinite(distortionPrevInput) || Math.abs(distortionPrevInput) < epsilon) distortionPrevInput = 0.0;
				if (!Number.isFinite(distortionNextOutput) || Math.abs(distortionNextOutput) < epsilon) distortionNextOutput = 0.0;

				instrumentState.distortionFractionalInput1 = distortionFractionalInput1;
				instrumentState.distortionFractionalInput2 = distortionFractionalInput2;
				instrumentState.distortionFractionalInput3 = distortionFractionalInput3;
				instrumentState.distortionPrevInput = distortionPrevInput;
				instrumentState.distortionNextOutput = distortionNextOutput;`;
                }
                if (usesBitcrusher) {
                    effectsSource += `

				if (Math.abs(bitcrusherPrevInput) < epsilon) bitcrusherPrevInput = 0.0;
				if (Math.abs(bitcrusherCurrentOutput) < epsilon) bitcrusherCurrentOutput = 0.0;
				instrumentState.bitcrusherPrevInput = bitcrusherPrevInput;
				instrumentState.bitcrusherCurrentOutput = bitcrusherCurrentOutput;
				instrumentState.bitcrusherPhase = bitcrusherPhase;
				instrumentState.bitcrusherPhaseDelta = bitcrusherPhaseDelta;
				instrumentState.bitcrusherScale = bitcrusherScale;
				instrumentState.bitcrusherFoldLevel = bitcrusherFoldLevel;`;
                }
                if (usesEqFilter) {
                    effectsSource += `

				synth.sanitizeFilters(filters);
				// The filter input here is downstream from another filter so we
				// better make sure it's safe too.
				if (!(initialFilterInput1 < 100) || !(initialFilterInput2 < 100)) {
					initialFilterInput1 = 0.0;
					initialFilterInput2 = 0.0;
				}
				if (Math.abs(initialFilterInput1) < epsilon) initialFilterInput1 = 0.0;
				if (Math.abs(initialFilterInput2) < epsilon) initialFilterInput2 = 0.0;
				instrumentState.initialEqFilterInput1 = initialFilterInput1;
				instrumentState.initialEqFilterInput2 = initialFilterInput2;`;
                }
                if (usesPanning) {
                    effectsSource += `

				beepbox.Synth.sanitizeDelayLine(panningDelayLine, panningDelayPos, panningMask);
				instrumentState.panningDelayPos = panningDelayPos;
				instrumentState.panningVolumeL = panningVolumeL;
				instrumentState.panningVolumeR = panningVolumeR;
				instrumentState.panningOffsetL = panningOffsetL;
				instrumentState.panningOffsetR = panningOffsetR;`;
                }
                if (usesChorus) {
                    effectsSource += `

				beepbox.Synth.sanitizeDelayLine(chorusDelayLineL, chorusDelayPos, chorusMask);
				beepbox.Synth.sanitizeDelayLine(chorusDelayLineR, chorusDelayPos, chorusMask);
				instrumentState.chorusPhase = chorusPhase;
				instrumentState.chorusDelayPos = chorusDelayPos;
				instrumentState.chorusVoiceMult = chorusVoiceMult;
				instrumentState.chorusCombinedMult = chorusCombinedMult;`;
                }
                if (usesEcho) {
                    effectsSource += `

				beepbox.Synth.sanitizeDelayLine(echoDelayLineL, echoDelayPos, echoMask);
				beepbox.Synth.sanitizeDelayLine(echoDelayLineR, echoDelayPos, echoMask);
				instrumentState.echoDelayPos = echoDelayPos;
				instrumentState.echoMult = echoMult;
				instrumentState.echoDelayOffsetRatio = echoDelayOffsetRatio;

				if (!Number.isFinite(echoShelfSampleL) || Math.abs(echoShelfSampleL) < epsilon) echoShelfSampleL = 0.0;
				if (!Number.isFinite(echoShelfSampleR) || Math.abs(echoShelfSampleR) < epsilon) echoShelfSampleR = 0.0;
				if (!Number.isFinite(echoShelfPrevInputL) || Math.abs(echoShelfPrevInputL) < epsilon) echoShelfPrevInputL = 0.0;
				if (!Number.isFinite(echoShelfPrevInputR) || Math.abs(echoShelfPrevInputR) < epsilon) echoShelfPrevInputR = 0.0;
				instrumentState.echoShelfSampleL = echoShelfSampleL;
				instrumentState.echoShelfSampleR = echoShelfSampleR;
				instrumentState.echoShelfPrevInputL = echoShelfPrevInputL;
				instrumentState.echoShelfPrevInputR = echoShelfPrevInputR;`;
                }
                if (usesReverb) {
                    effectsSource += `

				beepbox.Synth.sanitizeDelayLine(reverbDelayLine, reverbDelayPos        , reverbMask);
				beepbox.Synth.sanitizeDelayLine(reverbDelayLine, reverbDelayPos +  3041, reverbMask);
				beepbox.Synth.sanitizeDelayLine(reverbDelayLine, reverbDelayPos +  6426, reverbMask);
				beepbox.Synth.sanitizeDelayLine(reverbDelayLine, reverbDelayPos + 10907, reverbMask);
				instrumentState.reverbDelayPos = reverbDelayPos;
				instrumentState.reverbMult = reverb;

				if (!Number.isFinite(reverbShelfSample0) || Math.abs(reverbShelfSample0) < epsilon) reverbShelfSample0 = 0.0;
				if (!Number.isFinite(reverbShelfSample1) || Math.abs(reverbShelfSample1) < epsilon) reverbShelfSample1 = 0.0;
				if (!Number.isFinite(reverbShelfSample2) || Math.abs(reverbShelfSample2) < epsilon) reverbShelfSample2 = 0.0;
				if (!Number.isFinite(reverbShelfSample3) || Math.abs(reverbShelfSample3) < epsilon) reverbShelfSample3 = 0.0;
				if (!Number.isFinite(reverbShelfPrevInput0) || Math.abs(reverbShelfPrevInput0) < epsilon) reverbShelfPrevInput0 = 0.0;
				if (!Number.isFinite(reverbShelfPrevInput1) || Math.abs(reverbShelfPrevInput1) < epsilon) reverbShelfPrevInput1 = 0.0;
				if (!Number.isFinite(reverbShelfPrevInput2) || Math.abs(reverbShelfPrevInput2) < epsilon) reverbShelfPrevInput2 = 0.0;
				if (!Number.isFinite(reverbShelfPrevInput3) || Math.abs(reverbShelfPrevInput3) < epsilon) reverbShelfPrevInput3 = 0.0;
				instrumentState.reverbShelfSample0 = reverbShelfSample0;
				instrumentState.reverbShelfSample1 = reverbShelfSample1;
				instrumentState.reverbShelfSample2 = reverbShelfSample2;
				instrumentState.reverbShelfSample3 = reverbShelfSample3;
				instrumentState.reverbShelfPrevInput0 = reverbShelfPrevInput0;
				instrumentState.reverbShelfPrevInput1 = reverbShelfPrevInput1;
				instrumentState.reverbShelfPrevInput2 = reverbShelfPrevInput2;
				instrumentState.reverbShelfPrevInput3 = reverbShelfPrevInput3;`;
                }
                effectsFunction = new Function("synth", "outputDataL", "outputDataR", "bufferIndex", "runLength", "instrumentState", effectsSource);
                Synth.effectsFunctionCache[signature] = effectsFunction;
            }
            effectsFunction(synth, outputDataL, outputDataR, bufferIndex, runLength, instrumentState);
        }
        static pulseWidthSynth(synth, bufferIndex, roundedSamplesPerTick, tone, instrument) {
            const sign = instrument.invertWave ? -1 : 1;
            const data = synth.tempMonoInstrumentSampleBuffer;
            let phaseDelta = tone.phaseDeltas[0];
            const phaseDeltaScale = +tone.phaseDeltaScales[0];
            let expression = +tone.expression;
            const expressionDelta = +tone.expressionDelta;
            let phase = (tone.phases[0] % 1);
            let pulseWidth = tone.pulseWidth;
            const pulseWidthDelta = tone.pulseWidthDelta;
            const filters = tone.noteFilters;
            const filterCount = tone.noteFilterCount | 0;
            let initialFilterInput1 = +tone.initialNoteFilterInput1;
            let initialFilterInput2 = +tone.initialNoteFilterInput2;
            const applyFilters = Synth.applyFilters;
            const stopIndex = bufferIndex + roundedSamplesPerTick;
            for (let sampleIndex = bufferIndex; sampleIndex < stopIndex; sampleIndex++) {
                const sawPhaseA = phase % 1;
                const sawPhaseB = (phase + pulseWidth) % 1;
                let pulseWave = sawPhaseB - sawPhaseA;
                if (!instrument.aliases) {
                    if (sawPhaseA < phaseDelta) {
                        var t = sawPhaseA / phaseDelta;
                        pulseWave += (t + t - t * t - 1) * 0.5;
                    }
                    else if (sawPhaseA > 1.0 - phaseDelta) {
                        var t = (sawPhaseA - 1.0) / phaseDelta;
                        pulseWave += (t + t + t * t + 1) * 0.5;
                    }
                    if (sawPhaseB < phaseDelta) {
                        var t = sawPhaseB / phaseDelta;
                        pulseWave -= (t + t - t * t - 1) * 0.5;
                    }
                    else if (sawPhaseB > 1.0 - phaseDelta) {
                        var t = (sawPhaseB - 1.0) / phaseDelta;
                        pulseWave -= (t + t + t * t + 1) * 0.5;
                    }
                }
                const inputSample = pulseWave * sign;
                const sample = applyFilters(inputSample, initialFilterInput1, initialFilterInput2, filterCount, filters);
                initialFilterInput2 = initialFilterInput1;
                initialFilterInput1 = inputSample;
                phase += phaseDelta;
                phaseDelta *= phaseDeltaScale;
                pulseWidth += pulseWidthDelta;
                const output = sample * expression;
                expression += expressionDelta;
                data[sampleIndex] += output;
            }
            tone.phases[0] = phase;
            tone.phaseDeltas[0] = phaseDelta;
            tone.expression = expression;
            tone.pulseWidth = pulseWidth;
            synth.sanitizeFilters(filters);
            tone.initialNoteFilterInput1 = initialFilterInput1;
            tone.initialNoteFilterInput2 = initialFilterInput2;
        }
        static noiseSynth(synth, bufferIndex, runLength, tone, instrumentState) {
            const randOff = tone.noteStartPart / (Config.partsPerBeat * synth.song.beatsPerBar);
            const sign = instrumentState.invertWave ? -1 : 1;
            const data = synth.tempMonoInstrumentSampleBuffer;
            const wave = instrumentState.wave;
            let phaseDelta = +tone.phaseDeltas[0];
            const phaseDeltaScale = +tone.phaseDeltaScales[0];
            let expression = +tone.expression;
            const expressionDelta = +tone.expressionDelta;
            let phase = (tone.phases[0] % 1) * Config.chipNoiseLength;
            if (tone.phases[0] == 0) {
                phase = randOff * Config.chipNoiseLength;
            }
            const phaseMask = Config.chipNoiseLength - 1;
            let noiseSample = +tone.noiseSample;
            const filters = tone.noteFilters;
            const filterCount = tone.noteFilterCount | 0;
            let initialFilterInput1 = +tone.initialNoteFilterInput1;
            let initialFilterInput2 = +tone.initialNoteFilterInput2;
            const applyFilters = Synth.applyFilters;
            const pitchRelativefilter = Math.min(1.0, phaseDelta * instrumentState.noisePitchFilterMult);
            const stopIndex = bufferIndex + runLength;
            for (let sampleIndex = bufferIndex; sampleIndex < stopIndex; sampleIndex++) {
                const waveSample = wave[phase & phaseMask];
                noiseSample += (waveSample - noiseSample) * pitchRelativefilter;
                const inputSample = noiseSample * sign;
                const sample = applyFilters(inputSample, initialFilterInput1, initialFilterInput2, filterCount, filters);
                initialFilterInput2 = initialFilterInput1;
                initialFilterInput1 = inputSample;
                phase += phaseDelta;
                phaseDelta *= phaseDeltaScale;
                const output = sample * expression;
                expression += expressionDelta;
                data[sampleIndex] += output;
            }
            tone.phases[0] = phase / Config.chipNoiseLength;
            tone.phaseDeltas[0] = phaseDelta;
            tone.expression = expression;
            tone.noiseSample = noiseSample;
            synth.sanitizeFilters(filters);
            tone.initialNoteFilterInput1 = initialFilterInput1;
            tone.initialNoteFilterInput2 = initialFilterInput2;
        }
        static spectrumSynth(synth, bufferIndex, runLength, tone, instrumentState) {
            const sign = instrumentState.invertWave ? -1 : 1;
            const data = synth.tempMonoInstrumentSampleBuffer;
            const wave = instrumentState.wave;
            const samplesInPeriod = (1 << 7);
            let phaseDelta = tone.phaseDeltas[0] * samplesInPeriod;
            const phaseDeltaScale = +tone.phaseDeltaScales[0];
            let expression = +tone.expression;
            const expressionDelta = +tone.expressionDelta;
            let noiseSample = +tone.noiseSample;
            const filters = tone.noteFilters;
            const filterCount = tone.noteFilterCount | 0;
            let initialFilterInput1 = +tone.initialNoteFilterInput1;
            let initialFilterInput2 = +tone.initialNoteFilterInput2;
            const applyFilters = Synth.applyFilters;
            let phase = (tone.phases[0] % 1) * Config.spectrumNoiseLength;
            if (tone.phases[0] == 0)
                phase = Synth.findRandomZeroCrossing(wave, Config.spectrumNoiseLength, synth, tone) + phaseDelta;
            const phaseMask = Config.spectrumNoiseLength - 1;
            const pitchRelativefilter = Math.min(1.0, phaseDelta);
            const stopIndex = bufferIndex + runLength;
            for (let sampleIndex = bufferIndex; sampleIndex < stopIndex; sampleIndex++) {
                const phaseInt = phase | 0;
                const index = phaseInt & phaseMask;
                let waveSample = wave[index];
                const phaseRatio = phase - phaseInt;
                waveSample += (wave[index + 1] - waveSample) * phaseRatio;
                noiseSample += (waveSample - noiseSample) * pitchRelativefilter;
                const inputSample = noiseSample * sign;
                const sample = applyFilters(inputSample, initialFilterInput1, initialFilterInput2, filterCount, filters);
                initialFilterInput2 = initialFilterInput1;
                initialFilterInput1 = inputSample;
                phase += phaseDelta;
                phaseDelta *= phaseDeltaScale;
                const output = sample * expression;
                expression += expressionDelta;
                data[sampleIndex] += output;
            }
            tone.phases[0] = phase / Config.spectrumNoiseLength;
            tone.phaseDeltas[0] = phaseDelta / samplesInPeriod;
            tone.expression = expression;
            tone.noiseSample = noiseSample;
            synth.sanitizeFilters(filters);
            tone.initialNoteFilterInput1 = initialFilterInput1;
            tone.initialNoteFilterInput2 = initialFilterInput2;
        }
        static drumsetSynth(synth, bufferIndex, runLength, tone, instrumentState) {
            const sign = instrumentState.invertWave ? -1 : 1;
            const data = synth.tempMonoInstrumentSampleBuffer;
            let wave = instrumentState.getDrumsetWave(tone.drumsetPitch);
            const referenceDelta = InstrumentState.drumsetIndexReferenceDelta(tone.drumsetPitch);
            let phaseDelta = tone.phaseDeltas[0] / referenceDelta;
            const phaseDeltaScale = +tone.phaseDeltaScales[0];
            let expression = +tone.expression;
            const expressionDelta = +tone.expressionDelta;
            const filters = tone.noteFilters;
            const filterCount = tone.noteFilterCount | 0;
            let initialFilterInput1 = +tone.initialNoteFilterInput1;
            let initialFilterInput2 = +tone.initialNoteFilterInput2;
            const applyFilters = Synth.applyFilters;
            let phase = (tone.phases[0] % 1) * Config.spectrumNoiseLength;
            if (tone.phases[0] == 0)
                phase = Synth.findRandomZeroCrossing(wave, Config.spectrumNoiseLength, synth, tone) + phaseDelta;
            const phaseMask = Config.spectrumNoiseLength - 1;
            const stopIndex = bufferIndex + runLength;
            for (let sampleIndex = bufferIndex; sampleIndex < stopIndex; sampleIndex++) {
                const phaseInt = phase | 0;
                const index = phaseInt & phaseMask;
                let noiseSample = wave[index];
                const phaseRatio = phase - phaseInt;
                noiseSample += (wave[index + 1] - noiseSample) * phaseRatio;
                const inputSample = noiseSample * sign;
                const sample = applyFilters(inputSample, initialFilterInput1, initialFilterInput2, filterCount, filters);
                initialFilterInput2 = initialFilterInput1;
                initialFilterInput1 = inputSample;
                phase += phaseDelta;
                phaseDelta *= phaseDeltaScale;
                const output = sample * expression;
                expression += expressionDelta;
                data[sampleIndex] += output;
            }
            tone.phases[0] = phase / Config.spectrumNoiseLength;
            tone.phaseDeltas[0] = phaseDelta * referenceDelta;
            tone.expression = expression;
            synth.sanitizeFilters(filters);
            tone.initialNoteFilterInput1 = initialFilterInput1;
            tone.initialNoteFilterInput2 = initialFilterInput2;
        }
        static modSynth(synth, stereoBufferIndex, roundedSamplesPerTick, tone, instrument) {
            if (!synth.song)
                return;
            let mod = Config.modCount - 1 - tone.pitches[0];
            if (instrument.invalidModulators[mod])
                return;
            let setting = instrument.modulators[mod];
            let usedInstruments = [];
            if (Config.modulators[instrument.modulators[mod]].forSong) {
                usedInstruments.push(0);
            }
            else {
                if (instrument.modInstruments[mod] == synth.song.channels[instrument.modChannels[mod]].instruments.length) {
                    for (let i = 0; i < synth.song.channels[instrument.modChannels[mod]].instruments.length; i++) {
                        usedInstruments.push(i);
                    }
                }
                else if (instrument.modInstruments[mod] > synth.song.channels[instrument.modChannels[mod]].instruments.length) {
                    if (synth.song.getPattern(instrument.modChannels[mod], synth.bar) != null)
                        usedInstruments = synth.song.getPattern(instrument.modChannels[mod], synth.bar).instruments;
                }
                else {
                    usedInstruments.push(instrument.modInstruments[mod]);
                }
            }
            for (let instrumentIndex = 0; instrumentIndex < usedInstruments.length; instrumentIndex++) {
                synth.setModValue(tone.expression, tone.expression + tone.expressionDelta, mod, instrument.modChannels[mod], usedInstruments[instrumentIndex], setting);
                if (setting == Config.modulators.dictionary["reset arp"].index && synth.tick == 0 && tone.noteStartPart == synth.beat * Config.partsPerBeat + synth.part) {
                    synth.song.channels[instrument.modChannels[mod]].instruments[usedInstruments[instrumentIndex]].arpTime = 0;
                }
                else if (setting == Config.modulators.dictionary["next bar"].index) {
                    synth.wantToSkip = true;
                }
                else if (setting == Config.modulators.dictionary["eq filter"].index) {
                    const tgtInstrument = synth.song.channels[instrument.modChannels[mod]].instruments[usedInstruments[instrumentIndex]];
                    if (!tgtInstrument.eqFilterType) {
                        let dotTarget = instrument.modFilterTypes[mod] | 0;
                        if (dotTarget == 0) {
                            let pinIdx = 0;
                            const currentPart = synth.getTicksIntoBar() / Config.ticksPerPart;
                            while (tone.note.start + tone.note.pins[pinIdx].time <= currentPart)
                                pinIdx++;
                            let lerpEndRatio = ((currentPart - tone.note.start + (roundedSamplesPerTick / (synth.getSamplesPerTick() * Config.ticksPerPart)) * Config.ticksPerPart) - tone.note.pins[pinIdx - 1].time) / (tone.note.pins[pinIdx].time - tone.note.pins[pinIdx - 1].time);
                            if (tgtInstrument.eqSubFilters[tone.note.pins[pinIdx - 1].size] != null || tgtInstrument.eqSubFilters[tone.note.pins[pinIdx].size] != null) {
                                tgtInstrument.tmpEqFilterEnd = FilterSettings.lerpFilters(tgtInstrument.eqSubFilters[tone.note.pins[pinIdx - 1].size], tgtInstrument.eqSubFilters[tone.note.pins[pinIdx].size], lerpEndRatio);
                            }
                            else {
                                tgtInstrument.tmpEqFilterEnd = tgtInstrument.eqFilter;
                            }
                        }
                        else {
                            for (let i = 0; i < Config.filterMorphCount; i++) {
                                if (tgtInstrument.tmpEqFilterEnd == tgtInstrument.eqSubFilters[i] && tgtInstrument.tmpEqFilterEnd != null) {
                                    tgtInstrument.tmpEqFilterEnd = new FilterSettings();
                                    tgtInstrument.tmpEqFilterEnd.fromJsonObject(tgtInstrument.eqSubFilters[i].toJsonObject());
                                }
                            }
                            if (tgtInstrument.tmpEqFilterEnd == null) {
                                tgtInstrument.tmpEqFilterEnd = new FilterSettings();
                                tgtInstrument.tmpEqFilterEnd.fromJsonObject(tgtInstrument.eqFilter.toJsonObject());
                            }
                            if (tgtInstrument.tmpEqFilterEnd.controlPointCount > Math.floor((dotTarget - 1) / 2)) {
                                if (dotTarget % 2) {
                                    tgtInstrument.tmpEqFilterEnd.controlPoints[Math.floor((dotTarget - 1) / 2)].freq = tone.expression + tone.expressionDelta;
                                }
                                else {
                                    tgtInstrument.tmpEqFilterEnd.controlPoints[Math.floor((dotTarget - 1) / 2)].gain = tone.expression + tone.expressionDelta;
                                }
                            }
                        }
                    }
                }
                else if (setting == Config.modulators.dictionary["note filter"].index) {
                    const tgtInstrument = synth.song.channels[instrument.modChannels[mod]].instruments[usedInstruments[instrumentIndex]];
                    if (!tgtInstrument.noteFilterType) {
                        let dotTarget = instrument.modFilterTypes[mod] | 0;
                        if (dotTarget == 0) {
                            let pinIdx = 0;
                            const currentPart = synth.getTicksIntoBar() / Config.ticksPerPart;
                            while (tone.note.start + tone.note.pins[pinIdx].time <= currentPart)
                                pinIdx++;
                            let lerpEndRatio = ((currentPart - tone.note.start + (roundedSamplesPerTick / (synth.getSamplesPerTick() * Config.ticksPerPart)) * Config.ticksPerPart) - tone.note.pins[pinIdx - 1].time) / (tone.note.pins[pinIdx].time - tone.note.pins[pinIdx - 1].time);
                            if (tgtInstrument.noteSubFilters[tone.note.pins[pinIdx - 1].size] != null || tgtInstrument.noteSubFilters[tone.note.pins[pinIdx].size] != null) {
                                tgtInstrument.tmpNoteFilterEnd = FilterSettings.lerpFilters(tgtInstrument.noteSubFilters[tone.note.pins[pinIdx - 1].size], tgtInstrument.noteSubFilters[tone.note.pins[pinIdx].size], lerpEndRatio);
                            }
                            else {
                                tgtInstrument.tmpNoteFilterEnd = tgtInstrument.noteFilter;
                            }
                        }
                        else {
                            for (let i = 0; i < Config.filterMorphCount; i++) {
                                if (tgtInstrument.tmpNoteFilterEnd == tgtInstrument.noteSubFilters[i] && tgtInstrument.tmpNoteFilterEnd != null) {
                                    tgtInstrument.tmpNoteFilterEnd = new FilterSettings();
                                    tgtInstrument.tmpNoteFilterEnd.fromJsonObject(tgtInstrument.noteSubFilters[i].toJsonObject());
                                }
                            }
                            if (tgtInstrument.tmpNoteFilterEnd == null) {
                                tgtInstrument.tmpNoteFilterEnd = new FilterSettings();
                                tgtInstrument.tmpNoteFilterEnd.fromJsonObject(tgtInstrument.noteFilter.toJsonObject());
                            }
                            if (tgtInstrument.tmpNoteFilterEnd.controlPointCount > Math.floor((dotTarget - 1) / 2)) {
                                if (dotTarget % 2) {
                                    tgtInstrument.tmpNoteFilterEnd.controlPoints[Math.floor((dotTarget - 1) / 2)].freq = tone.expression + tone.expressionDelta;
                                }
                                else {
                                    tgtInstrument.tmpNoteFilterEnd.controlPoints[Math.floor((dotTarget - 1) / 2)].gain = tone.expression + tone.expressionDelta;
                                }
                            }
                        }
                    }
                }
            }
        }
        static findRandomZeroCrossing(wave, waveLength, synth, tone) {
            const randOff = tone.noteStartPart / (Config.partsPerBeat * synth.song.beatsPerBar);
            let phase = randOff * waveLength;
            const phaseMask = waveLength - 1;
            let indexPrev = phase & phaseMask;
            let wavePrev = wave[indexPrev];
            const stride = 16;
            for (let attemptsRemaining = 128; attemptsRemaining > 0; attemptsRemaining--) {
                const indexNext = (indexPrev + stride) & phaseMask;
                const waveNext = wave[indexNext];
                if (wavePrev * waveNext <= 0.0) {
                    for (let i = 0; i < stride; i++) {
                        const innerIndexNext = (indexPrev + 1) & phaseMask;
                        const innerWaveNext = wave[innerIndexNext];
                        if (wavePrev * innerWaveNext <= 0.0) {
                            const slope = innerWaveNext - wavePrev;
                            phase = indexPrev;
                            if (Math.abs(slope) > 0.00000001) {
                                phase += -wavePrev / slope;
                            }
                            phase = Math.max(0, phase) % waveLength;
                            break;
                        }
                        else {
                            indexPrev = innerIndexNext;
                            wavePrev = innerWaveNext;
                        }
                    }
                    break;
                }
                else {
                    indexPrev = indexNext;
                    wavePrev = waveNext;
                }
            }
            return phase;
        }
        static instrumentVolumeToVolumeMult(instrumentVolume) {
            return (instrumentVolume == -Config.volumeRange / 2.0) ? 0.0 : Math.pow(2, Config.volumeLogScale * instrumentVolume);
        }
        static volumeMultToInstrumentVolume(volumeMult) {
            return (volumeMult <= 0.0) ? -Config.volumeRange / 2 : Math.min(Config.volumeRange, (Math.log(volumeMult) / Math.LN2) / Config.volumeLogScale);
        }
        static noteSizeToVolumeMult(size) {
            return Math.pow(Math.max(0.0, size) / Config.noteSizeMax, 1.5);
        }
        static volumeMultToNoteSize(volumeMult) {
            return Math.pow(Math.max(0.0, volumeMult), 1 / 1.5) * Config.noteSizeMax;
        }
        static fadeInSettingToSeconds(setting) {
            return 0.0125 * (0.95 * setting + 0.05 * setting * setting);
        }
        static secondsToFadeInSetting(seconds) {
            return clamp(0, Config.fadeInRange, Math.round((-0.95 + Math.sqrt(0.9025 + 0.2 * seconds / 0.0125)) / 0.1));
        }
        static fadeOutSettingToTicks(setting) {
            return Config.fadeOutTicks[setting];
        }
        static ticksToFadeOutSetting(ticks) {
            let lower = Config.fadeOutTicks[0];
            if (ticks <= lower)
                return 0;
            for (let i = 1; i < Config.fadeOutTicks.length; i++) {
                let upper = Config.fadeOutTicks[i];
                if (ticks <= upper)
                    return (ticks < (lower + upper) / 2) ? i - 1 : i;
                lower = upper;
            }
            return Config.fadeOutTicks.length - 1;
        }
        static detuneToCents(detune) {
            return detune - Config.detuneCenter;
        }
        static centsToDetune(cents) {
            return cents + Config.detuneCenter;
        }
        static getOperatorWave(waveform, pulseWidth) {
            if (waveform != 3) {
                return Config.operatorWaves[waveform];
            }
            else {
                return Config.pwmOperatorWaves[pulseWidth];
            }
        }
        getSamplesPerTick() {
            if (this.song == null)
                return 0;
            let beatsPerMinute = this.song.getBeatsPerMinute();
            if (this.isModActive(Config.modulators.dictionary["tempo"].index)) {
                beatsPerMinute = this.getModValue(Config.modulators.dictionary["tempo"].index);
            }
            return this.getSamplesPerTickSpecificBPM(beatsPerMinute);
        }
        getSamplesPerTickSpecificBPM(beatsPerMinute) {
            const beatsPerSecond = beatsPerMinute / 60.0;
            const partsPerSecond = Config.partsPerBeat * beatsPerSecond;
            const tickPerSecond = Config.ticksPerPart * partsPerSecond;
            return this.samplesPerSecond / tickPerSecond;
        }
        static fittingPowerOfTwo(x) {
            return 1 << (32 - Math.clz32(Math.ceil(x) - 1));
        }
        sanitizeFilters(filters) {
            let reset = false;
            for (const filter of filters) {
                const output1 = Math.abs(filter.output1);
                const output2 = Math.abs(filter.output2);
                if (!(output1 < 100) || !(output2 < 100)) {
                    reset = true;
                    break;
                }
                if (output1 < epsilon)
                    filter.output1 = 0.0;
                if (output2 < epsilon)
                    filter.output2 = 0.0;
            }
            if (reset) {
                for (const filter of filters) {
                    filter.output1 = 0.0;
                    filter.output2 = 0.0;
                }
            }
        }
        static sanitizeDelayLine(delayLine, lastIndex, mask) {
            while (true) {
                lastIndex--;
                const index = lastIndex & mask;
                const sample = Math.abs(delayLine[index]);
                if (Number.isFinite(sample) && (sample == 0.0 || sample >= epsilon))
                    break;
                delayLine[index] = 0.0;
            }
        }
        static applyFilters(sample, input1, input2, filterCount, filters) {
            for (let i = 0; i < filterCount; i++) {
                const filter = filters[i];
                const output1 = filter.output1;
                const output2 = filter.output2;
                const a1 = filter.a1;
                const a2 = filter.a2;
                const b0 = filter.b0;
                const b1 = filter.b1;
                const b2 = filter.b2;
                sample = b0 * sample + b1 * input1 + b2 * input2 - a1 * output1 - a2 * output2;
                filter.a1 = a1 + filter.a1Delta;
                filter.a2 = a2 + filter.a2Delta;
                if (filter.useMultiplicativeInputCoefficients) {
                    filter.b0 = b0 * filter.b0Delta;
                    filter.b1 = b1 * filter.b1Delta;
                    filter.b2 = b2 * filter.b2Delta;
                }
                else {
                    filter.b0 = b0 + filter.b0Delta;
                    filter.b1 = b1 + filter.b1Delta;
                    filter.b2 = b2 + filter.b2Delta;
                }
                filter.output2 = output1;
                filter.output1 = sample;
                input2 = output2;
                input1 = output1;
            }
            return sample;
        }
    }
    Synth.tempFilterStartCoefficients = new FilterCoefficients();
    Synth.tempFilterEndCoefficients = new FilterCoefficients();
    Synth.fmSynthFunctionCache = {};
    Synth.effectsFunctionCache = Array(1 << 7).fill(undefined);
    Synth.pickedStringFunctionCache = Array(3).fill(undefined);
    Synth.fmSourceTemplate = (`
        const sign = instrumentState.invertWave ? -1 : 1;
		const data = synth.tempMonoInstrumentSampleBuffer;
		const sineWave = beepbox.Config.sineWave;

		// I'm adding 1000 to the phase to ensure that it's never negative even when modulated by other waves because negative numbers don't work with the modulus operator very well.
		let operator#Phase       = +((tone.phases[#] % 1) + 1000) * ` + Config.sineWaveLength + `;
		let operator#PhaseDelta  = +tone.phaseDeltas[#] * ` + Config.sineWaveLength + `;
		let operator#PhaseDeltaScale = +tone.phaseDeltaScales[#];
		let operator#OutputMult  = +tone.operatorExpressions[#];
		const operator#OutputDelta = +tone.operatorExpressionDeltas[#];
		let operator#Output      = +tone.feedbackOutputs[#];
        const operator#Wave      = tone.operatorWaves[#].samples;
		let feedbackMult         = +tone.feedbackMult;
		const feedbackDelta        = +tone.feedbackDelta;
        let expression = +tone.expression;
		const expressionDelta = +tone.expressionDelta;

		const filters = tone.noteFilters;
		const filterCount = tone.noteFilterCount|0;
		let initialFilterInput1 = +tone.initialNoteFilterInput1;
		let initialFilterInput2 = +tone.initialNoteFilterInput2;
		const applyFilters = beepbox.Synth.applyFilters;

		const stopIndex = bufferIndex + roundedSamplesPerTick;
		for (let sampleIndex = bufferIndex; sampleIndex < stopIndex; sampleIndex++) {
				// INSERT OPERATOR COMPUTATION HERE
				const fmOutput = (/*operator#Scaled*/); // CARRIER OUTPUTS

			const inputSample = fmOutput*sign;
			const sample = applyFilters(inputSample, initialFilterInput1, initialFilterInput2, filterCount, filters);
			initialFilterInput2 = initialFilterInput1;
			initialFilterInput1 = inputSample;

				feedbackMult += feedbackDelta;
				operator#OutputMult += operator#OutputDelta;
				operator#Phase += operator#PhaseDelta;
			operator#PhaseDelta *= operator#PhaseDeltaScale;

			const output = sample * expression;
			expression += expressionDelta;

			data[sampleIndex] += output;
			}

			tone.phases[#] = operator#Phase / ` + Config.sineWaveLength + `;
			tone.phaseDeltas[#] = operator#PhaseDelta / ` + Config.sineWaveLength + `;
			tone.operatorExpressions[#] = operator#OutputMult;
		    tone.feedbackOutputs[#] = operator#Output;
		    tone.feedbackMult = feedbackMult;
		    tone.expression = expression;

		synth.sanitizeFilters(filters);
		tone.initialNoteFilterInput1 = initialFilterInput1;
		tone.initialNoteFilterInput2 = initialFilterInput2;
		`).split("\n");
    Synth.operatorSourceTemplate = (`
				const operator#PhaseMix = operator#Phase/* + operator@Scaled*/;
				const operator#PhaseInt = operator#PhaseMix|0;
				const operator#Index    = operator#PhaseInt & ` + Config.sineWaveMask + `;
                const operator#Sample   = operator#Wave[operator#Index];
                operator#Output         = operator#Sample + (operator#Wave[operator#Index + 1] - operator#Sample) * (operator#PhaseMix - operator#PhaseInt);
				const operator#Scaled   = operator#OutputMult * operator#Output;
		`).split("\n");

    exports.Channel = Channel;
    exports.Config = Config;
    exports.EnvelopeSettings = EnvelopeSettings;
    exports.FilterControlPoint = FilterControlPoint;
    exports.FilterSettings = FilterSettings;
    exports.HarmonicsWave = HarmonicsWave;
    exports.Instrument = Instrument;
    exports.Note = Note;
    exports.Operator = Operator;
    exports.Pattern = Pattern;
    exports.Song = Song;
    exports.SpectrumWave = SpectrumWave;
    exports.Synth = Synth;
    exports.clamp = clamp;
    exports.makeNotePin = makeNotePin;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
//# sourceMappingURL=beepbox_synth.js.map
