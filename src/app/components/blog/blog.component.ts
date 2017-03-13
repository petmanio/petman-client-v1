import { Component, ChangeDetectionStrategy } from '@angular/core';

export interface IBlogComponent {

}

@Component({
  selector: 'app-blog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="columns">
      <div class="column">
        <md-card class="example-card">
          <img md-card-image src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/LA-Triceratops_mount-2.jpg/1280px-LA-Triceratops_mount-2.jpg">
          <md-card-content>
            <p>
             Dinosaurs are a diverse group of reptiles of the clade Dinosauria that first appeared during the Triassic. Although the exact origin and timing of the evolution of dinosaurs is the subject of active research,[1] the current scientific consensus places their origin between 231 and 243 million years ago.[2] They became the dominant terrestrial vertebrates after the Triassic–Jurassic extinction event 201 million years ago. Their dominance continued through the Jurassic and Cretaceous periods and ended when the Cretaceous–Paleogene extinction event led to the extinction of most dinosaur groups 66 million years ago.
            </p>
          </md-card-content>
          <md-card-actions>
            <button md-button>LIKE</button>
            <button md-button>SHARE</button>
          </md-card-actions>
        </md-card>
      </div>
      <div class="column">
        <md-card class="example-card">
          <img md-card-image src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/LA-Triceratops_mount-2.jpg/1280px-LA-Triceratops_mount-2.jpg">
          <md-card-content>
            <p>
             Dinosaurs are a diverse group of reptiles of the clade Dinosauria that first appeared during the Triassic. Although the exact origin and timing of the evolution of dinosaurs is the subject of active research,[1] the current scientific consensus places their origin between 231 and 243 million years ago.[2] They became the dominant terrestrial vertebrates after the Triassic–Jurassic extinction event 201 million years ago. Their dominance continued through the Jurassic and Cretaceous periods and ended when the Cretaceous–Paleogene extinction event led to the extinction of most dinosaur groups 66 million years ago.
            </p>
          </md-card-content>
          <md-card-actions>
            <button md-button>LIKE</button>
            <button md-button>SHARE</button>
          </md-card-actions>
        </md-card>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <md-card class="example-card">
          <img md-card-image src="https://upload.wikimedia.org/wikipedia/commons/0/0c/T._rex_old_posture.jpg">
          <md-card-content>
            <p>
              Tyrannosaurus (/tᵻˌrænəˈsɔːrəs/ or /taɪˌrænəˈsɔːrəs/, meaning "tyrant lizard", from the Ancient Greek tyrannos (τύραννος), "tyrant", and sauros (σαῦρος), "lizard"[1]) is a genus of coelurosaurian theropod dinosaur. The species Tyrannosaurus rex (rex meaning "king" in Latin), is one of the most well-represented of the large theropods. Tyrannosaurus lived throughout what is now western North America, on what was then an island continent known as Laramidia. Tyrannosaurus had a much wider range than other tyrannosaurids. Fossils are found in a variety of rock formations dating to the Maastrichtian age of the upper Cretaceous Period
            </p>
          </md-card-content>
          <md-card-actions>
            <button md-button>LIKE</button>
            <button md-button>SHARE</button>
          </md-card-actions>
        </md-card>
      </div>
       <div class="column">
        <md-card class="example-card">
          <img md-card-image src="http://i656.photobucket.com/albums/uu283/ireland555/dinosaur-2.jpg">
          <md-card-content>
            <p>
              Most dinosaurs were vegetarian and T-rex was just an exception, finds new study
              
              By Daily Mail Reporter
              Updated: 19:42 GMT, 22 December 2010
              
              102
              
              View comments
              
              Most dinosaurs were vegetarian rather than terrifying carnivores depicted in films, according to a new study.
              
              Many 'theropod' dinosaurs, those with bird-like features which walked on two legs and often had feathers, preferred to eat leaves and grass.
              
              Read more: http://www.dailymail.co.uk/sciencetech/article-1340447/Most-dinosaurs-vegetarian-T-rex-just-exception-finds-new-study.html#ixzz4bF5CnUiB
              Follow us: @MailOnline on Twitter | DailyMail on Facebook

            </p>
          </md-card-content>
          <md-card-actions>
            <button md-button>LIKE</button>
            <button md-button>SHARE</button>
          </md-card-actions>
        </md-card>
      </div>
    </div>
        <div class="columns">
      <div class="column">
        <md-card class="example-card">
          <img md-card-image src="https://upload.wikimedia.org/wikipedia/commons/0/0c/T._rex_old_posture.jpg">
          <md-card-content>
            <p>
              Tyrannosaurus (/tᵻˌrænəˈsɔːrəs/ or /taɪˌrænəˈsɔːrəs/, meaning "tyrant lizard", from the Ancient Greek tyrannos (τύραννος), "tyrant", and sauros (σαῦρος), "lizard"[1]) is a genus of coelurosaurian theropod dinosaur. The species Tyrannosaurus rex (rex meaning "king" in Latin), is one of the most well-represented of the large theropods. Tyrannosaurus lived throughout what is now western North America, on what was then an island continent known as Laramidia. Tyrannosaurus had a much wider range than other tyrannosaurids. Fossils are found in a variety of rock formations dating to the Maastrichtian age of the upper Cretaceous Period
            </p>
          </md-card-content>
          <md-card-actions>
            <button md-button>LIKE</button>
            <button md-button>SHARE</button>
          </md-card-actions>
        </md-card>
      </div>
       <div class="column">
        <md-card class="example-card">
          <img md-card-image src="http://i656.photobucket.com/albums/uu283/ireland555/dinosaur-2.jpg">
          <md-card-content>
            <p>
              Most dinosaurs were vegetarian and T-rex was just an exception, finds new study
              
              By Daily Mail Reporter
              Updated: 19:42 GMT, 22 December 2010
              
              102
              
              View comments
              
              Most dinosaurs were vegetarian rather than terrifying carnivores depicted in films, according to a new study.
              
              Many 'theropod' dinosaurs, those with bird-like features which walked on two legs and often had feathers, preferred to eat leaves and grass.
              
              Read more: http://www.dailymail.co.uk/sciencetech/article-1340447/Most-dinosaurs-vegetarian-T-rex-just-exception-finds-new-study.html#ixzz4bF5CnUiB
              Follow us: @MailOnline on Twitter | DailyMail on Facebook

            </p>
          </md-card-content>
          <md-card-actions>
            <button md-button>LIKE</button>
            <button md-button>SHARE</button>
          </md-card-actions>
        </md-card>
      </div>
        <div class="column">
        <md-card class="example-card">
          <img md-card-image src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/LA-Triceratops_mount-2.jpg/1280px-LA-Triceratops_mount-2.jpg">
          <md-card-content>
            <p>
             Dinosaurs are a diverse group of reptiles of the clade Dinosauria that first appeared during the Triassic. Although the exact origin and timing of the evolution of dinosaurs is the subject of active research,[1] the current scientific consensus places their origin between 231 and 243 million years ago.[2] They became the dominant terrestrial vertebrates after the Triassic–Jurassic extinction event 201 million years ago. Their dominance continued through the Jurassic and Cretaceous periods and ended when the Cretaceous–Paleogene extinction event led to the extinction of most dinosaur groups 66 million years ago.
            </p>
          </md-card-content>
          <md-card-actions>
            <button md-button>LIKE</button>
            <button md-button>SHARE</button>
          </md-card-actions>
        </md-card>
      </div>      
    </div>
  `,
  styles: [`
    md-card-title {
      display: flex;
      justify-content: center;
    }
    .example-card {
    /*height: 300px;*/
    } 
  `]
})
export class BlogComponent implements IBlogComponent {
  constructor() {

  }
}
