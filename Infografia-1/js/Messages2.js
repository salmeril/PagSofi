// Mensajes adicionales
const additionalMessages = [
    { type: 'text', content: 'Este es el primer mensaje adicional.' },
    { type: 'audio', content: 'ruta/al/audio2.mp3' },
    { type: 'text', content: 'Este es el segundo mensaje adicional después del audio.' }
];
// Llama a simulateTyping o la función que maneje los mensajes
simulateTyping(initialMessages, () => {
    showMessages(initialMessages);
});