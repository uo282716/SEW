class Reproductor {
  constructor() {
  }

  leerArchivo(archivos) {
      this.audio = new window.AudioContext();

      var fileReader = new FileReader();
      fileReader.onload = (e) =>{
          this.playMusic(e.target.result);
      };
      fileReader.readAsArrayBuffer(archivos[0]);
  }

  playMusic(audioFile) {
      this.audio.decodeAudioData(audioFile, (buffer) => {
          this.audioBuffer = buffer;
      })
  }

  play() {
      if(this.audio != null){
        this.stop();
        this.source = this.audio.createBufferSource();
        this.source.buffer = this.audioBuffer;
        this.source.loop = true;
        this.source.connect(this.audio.destination);
        this.source.start(0);
      } else{
        alert("Introduce un archivo de audio");
      }
      
  }

  stop() {
      if (this.source) {
          this.source.stop();
      }
  }

  dropHandler(ev) {  
    // Evitar el comportamiendo por defecto (Evitar que el fichero se abra/ejecute)

      ev.preventDefault();
  
      if (ev.dataTransfer.items) {
        // Usar la interfaz DataTransferItemList para acceder a el/los archivos)
        if (ev.dataTransfer.items[0].kind === 'file') {
            var file = ev.dataTransfer.items[0].getAsFile();
            var archivos = new Array();
            archivos.push(file);
            this.leerArchivo(archivos);
        }
        
      } else {
        var file = ev.dataTransfer.items[0].getAsFile();
        this.leerArchivo(file);
      }
    
      // Pasar el evento a removeDragData para limpiar
      this.removeDragData(ev);
      this.play();
    
  }

  removeDragData(ev) {
    console.log('Removing drag data')
  
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to remove the drag data
      ev.dataTransfer.items.clear();
    } else {
      // Use DataTransfer interface to remove the drag data
      ev.dataTransfer.clearData();
    }
  }

  dragOverHandler(ev) {
    console.log('File(s) in drop zone');
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }
  
  
}

var reproductor = new Reproductor();