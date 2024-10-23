# PlantUML Editor

Bu proje, **React** ve **Monaco Editor** kullanılarak geliştirilmiş bir PlantUML düzenleyicisidir. Kullanıcılar PlantUML kodlarını yazabilir, önizlemesini görebilir ve düzenleme sırasında yakınlaştırma, uzaklaştırma ve sürükleme özelliklerini kullanabilirler.

## Özellikler

- **Kod Düzenleme**: Monaco Editor ile entegre edilmiş PlantUML kod editörü.
- **PlantUML Önizlemesi**: PlantUML kodunun SVG formatında canlı olarak önizlemesi.
- **Yakınlaştırma / Uzaklaştırma**: Fare tekerleği veya butonlar aracılığıyla önizleme üzerinde yakınlaştırma ve uzaklaştırma yapabilme.
- **Sürükle ve Bırak**: Önizleme alanını sürükleyerek konumunu ayarlayabilme.
- **Hata Yönetimi**: Kodun işlenmesi veya önizlemenin yüklenmesi sırasında oluşabilecek hatalar için kullanıcıya bilgi verme.

## Kullanılan Teknolojiler

- **React**: Kullanıcı arayüzünü oluşturmak için kullanılan JavaScript kütüphanesi.
- **Monaco Editor**: Visual Studio Code'da kullanılan güçlü bir kod editörü.
- **PlantUML Encoder**: PlantUML kodunu şifrelemek ve uzaktan önizleme URL'si oluşturmak için kullanılan yardımcı kütüphane.
- **Tailwind CSS**: Arayüzün stilini düzenlemek için kullanılan CSS framework'ü.

## Kurulum

Bu projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1. Depoyu klonlayın:
    ```bash
    git clone https://github.com/username/plantuml-editor.git
    ```
2. Proje dizinine gidin:
    ```bash
    cd plantuml-editor
    ```
3. Gerekli paketleri yükleyin:
    ```bash
    npm install
    ```
4. Uygulamayı başlatın:
    ```bash
    npm run dev
    ```

## Kullanım

- Kod editörüne PlantUML kodunuzu yazın veya yapıştırın.
- Kod yazarken otomatik olarak önizleme alanında SVG görüntüsü oluşacaktır.
- **Zoom In** ve **Zoom Out** butonlarını kullanarak görüntüyü yakınlaştırıp uzaklaştırabilirsiniz.
- Görüntüyü sürükleyerek istediğiniz konuma taşıyabilirsiniz.

## Bilinen Problemler

- Kod çok karmaşık veya büyük olduğunda önizleme gecikmesi yaşanabilir.
- Hatalı kod girişlerinde SVG önizlemesi yüklenmeyebilir.

## Geliştirme

Eğer projeyi geliştirmek veya katkıda bulunmak isterseniz:

1. Fork yapın.
2. Yeni bir branch oluşturun:
    ```bash
    git checkout -b feature/ozellik-adi
    ```
3. Değişikliklerinizi yapın ve commit edin:
    ```bash
    git commit -m "Yeni bir özellik eklendi"
    ```
4. Branch'i gönderin:
    ```bash
    git push origin feature/ozellik-adi
    ```
5. Bir pull request açın.

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasına bakabilirsiniz.
