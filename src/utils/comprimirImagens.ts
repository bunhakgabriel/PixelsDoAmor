/**
 * Comprime um arquivo File de imagem
 * @param file Arquivo original (File)
 * @param quality Qualidade da compressão (0 a 1, default 0.7)
 * @param maxWidth Largura máxima da imagem (default 1920px)
 * @param maxHeight Altura máxima da imagem (default 1080px)
 * @returns Novo File comprimido
 */
export async function comprimirImagem(
    file: File,
    quality = 0.7,
    maxWidth = 1920,
    maxHeight = 1080
  ): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
  
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let { width, height } = img;
  
          // Redimensiona mantendo a proporção
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = width * ratio;
            height = height * ratio;
          }
  
          canvas.width = width;
          canvas.height = height;
  
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject("Erro ao criar contexto do canvas");
  
          ctx.drawImage(img, 0, 0, width, height);
  
          // Gera o blob comprimido
          canvas.toBlob(
            (blob) => {
              if (!blob) return reject("Erro ao gerar blob da imagem");
  
              // Cria um novo File comprimido
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
  
              resolve(compressedFile);
            },
            file.type,
            quality // nível de compressão
          );
        };
  
        img.onerror = (err) => reject(err);
      };
  
      reader.onerror = (err) => reject(err);
  
      reader.readAsDataURL(file);
    });
  }
  