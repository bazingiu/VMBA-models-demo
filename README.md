# VMBA 
L'obiettivo finale è dedurre i comportamenti dei clienti durante i loro acquisti da sequenze di immagini acquisite con telecamere montate sui carrelli della spesa.
Queste informazioni possono essere utilizzate per effettuare Market Basket Analysis così da aiutare i rivenditori a una migliore gestione degli spazi e delle strategie di marketing.

## Demo
La demo disponibile a questo Repository è stata realizzata tramite Open Neural Network eXchange (ONNX) che ci ha permesso di esportare i modelli tramite python in formato onnx e successivamente utilizzarli in una pagina web. 

Nella pagina è possibile selezionare da un menù a tendina una delle immagini del dataset che verrà passata a AlexNet e ResNet-50, i modelli con cui abbiamo ottenuto i risultati migliori. A schermo verranno visualizzati gli output di ciascun modello con le percentuali di predizione rispetto ad ogni classe e la reale etichetta dell’immagine, inoltre se il modello è riuscito a classificare correttamente l’input il riquadro sarà di colore verde altrimenti rosso. 

Un’altra funzionalità presente riguarda l’upload di immagini scelte dall’utente da far classificare ai due modelli.

### Come utilizzare
1. Eseguire `npm install` per inizializzare la repository e scaricare tutte le dipendenza
2. Eseguire `npm run build` per buildare il progetto e preparare la pagina web
3. Eseguire `npm run serve` per avviare il server e rendere disponibile il programma dal browser
4. Visitare `localhost:8080` col browser per visualizzare la demo
