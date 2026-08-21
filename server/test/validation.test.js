const test = require("node:test");
const assert = require("node:assert/strict");
const { normalizeEmail, isValidEmail, cleanText, isValidHttpUrl, isNonNegativeInteger } = require("../src/utils/validation");

test("normaliza y valida correos", () => {
    assert.equal(normalizeEmail(" Admin@Virtuosa.CO "), "admin@virtuosa.co");
    assert.equal(isValidEmail("cliente@example.com"), true);
    assert.equal(isValidEmail("correo-invalido"), false);
});

test("limita texto y valida URL HTTP", () => {
    assert.equal(cleanText("  Virtuosa  ", 20), "Virtuosa");
    assert.equal(cleanText("abcdef", 3), "abc");
    assert.equal(isValidHttpUrl("https://images.example.com/product.jpg"), true);
    assert.equal(isValidHttpUrl("javascript:alert(1)"), false);
});

test("acepta solamente enteros no negativos", () => {
    assert.equal(isNonNegativeInteger(0), true);
    assert.equal(isNonNegativeInteger("5"), true);
    assert.equal(isNonNegativeInteger(-1), false);
    assert.equal(isNonNegativeInteger(2.5), false);
});
