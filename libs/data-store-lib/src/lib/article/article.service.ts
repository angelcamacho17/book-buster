import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';
import { BehaviorSubject, Observable, of, EMPTY } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ArticleService {
    private _articles: Article[] = [{
        "id": 1,
        "name": "Southern Comfort",
        "description": "Eosinophilic gastroenteritis",
        "price": "56.87"
      }, {
        "id": 2,
        "name": "Stock - Veal, White",
        "description": "Malignant neoplasm of other specified sites of nasopharynx",
        "price": "76.19"
      }, {
        "id": 3,
        "name": "Soy Protein",
        "description": "Placental polyp, unspecified as to episode of care or not applicable",
        "price": "98.57"
      }, {
        "id": 4,
        "name": "Ocean Spray - Ruby Red",
        "description": "Late effect of internal injury to chest",
        "price": "8.94"
      }, {
        "id": 5,
        "name": "Cheese - Le Cheve Noir",
        "description": "Late effect of radiation",
        "price": "89.72"
      }, {
        "id": 6,
        "name": "Broom And Brush Rack Black",
        "description": "Other and unspecified diseases of the oral soft tissues",
        "price": "83.66"
      }, {
        "id": 7,
        "name": "Basil - Dry, Rubbed",
        "description": "Closed fracture of condyle, femoral",
        "price": "73.49"
      }, {
        "id": 8,
        "name": "Muffin Mix - Carrot",
        "description": "Secondary neuroendocrine tumor, unspecified site",
        "price": "93.17"
      }, {
        "id": 9,
        "name": "Tea - Earl Grey",
        "description": "Stenosis of lacrimal punctum",
        "price": "95.78"
      }, {
        "id": 10,
        "name": "Pork - Butt, Boneless",
        "description": "Deep necrosis of underlying tissues [deep third degree) with loss of a body part, of forearm",
        "price": "37.21"
      }, {
        "id": 11,
        "name": "Almonds Ground Blanched",
        "description": "Vitreous membranes and strands",
        "price": "11.66"
      }, {
        "id": 12,
        "name": "Cakes Assorted",
        "description": "Other iatrogenic hypotension",
        "price": "33.74"
      }, {
        "id": 13,
        "name": "Cheese - Brick With Pepper",
        "description": "Prolonged first stage of labor, unspecified as to episode of care or not applicable",
        "price": "81.60"
      }, {
        "id": 14,
        "name": "Pork - European Side Bacon",
        "description": "Complications of transplanted kidney",
        "price": "71.84"
      }, {
        "id": 15,
        "name": "Octopus",
        "description": "Accident caused by ignition of clothing from controlled fire in private dwelling",
        "price": "14.28"
      }, {
        "id": 16,
        "name": "Apple - Northern Spy",
        "description": "Other acute rheumatic heart disease",
        "price": "72.48"
      }, {
        "id": 17,
        "name": "Oven Mitt - 13 Inch",
        "description": "Leukemic reticuloendotheliosis, intra-abdominal lymph nodes",
        "price": "14.64"
      }, {
        "id": 18,
        "name": "Arrowroot",
        "description": "Tuberculosis of unspecified bones and joints, tubercle bacilli found (in sputum) by microscopy",
        "price": "8.27"
      }, {
        "id": 19,
        "name": "Guava",
        "description": "Other and unspecified malignant neoplasms of lymphoid and histiocytic tissue, unspecified site, extranodal and solid organ sites",
        "price": "19.72"
      }, {
        "id": 20,
        "name": "Grenadillo",
        "description": "Visual discomfort",
        "price": "79.99"
      }, {
        "id": 21,
        "name": "Fish - Artic Char, Cold Smoked",
        "description": "Other benign neoplasm of connective and other soft tissue of lower limb, including hip",
        "price": "3.62"
      }, {
        "id": 22,
        "name": "Tea - Lemon Green Tea",
        "description": "Neoplasm of uncertain behavior of bone and articular cartilage",
        "price": "98.56"
      }, {
        "id": 23,
        "name": "Miso Paste White",
        "description": "Other constitutional aplastic anemia",
        "price": "10.63"
      }, {
        "id": 24,
        "name": "Coffee - Decaffeinato Coffee",
        "description": "Other venereal diseases due to chlamydia trachomatis, lower genitourinary sites",
        "price": "69.11"
      }, {
        "id": 25,
        "name": "Pate - Liver",
        "description": "Other septicemia due to gram-negative organisms",
        "price": "80.34"
      }, {
        "id": 26,
        "name": "Ecolab - Balanced Fusion",
        "description": "Quadruplet gestation, with two or more monochorionic fetuses",
        "price": "67.35"
      }, {
        "id": 27,
        "name": "Tuna - Canned, Flaked, Light",
        "description": "Elective hair transplant for purposes other than remedying health states",
        "price": "36.39"
      }, {
        "id": 28,
        "name": "Wine - Alsace Gewurztraminer",
        "description": "Pyoderma gangrenosum",
        "price": "51.18"
      }, {
        "id": 29,
        "name": "Guinea Fowl",
        "description": "Unspecified monoarthritis, site unspecified",
        "price": "74.00"
      }, {
        "id": 30,
        "name": "Salmon - Atlantic, No Skin",
        "description": "Post term pregnancy, unspecified as to episode of care or not applicable",
        "price": "78.52"
      }, {
        "id": 31,
        "name": "Tea - Honey Green Tea",
        "description": "Twin birth, mate liveborn, born in hospital, delivered without mention of cesarean section",
        "price": "61.15"
      }, {
        "id": 32,
        "name": "Soup - Knorr, Chicken Noodle",
        "description": "Poisoning by erythromycin and other macrolides",
        "price": "51.80"
      }, {
        "id": 33,
        "name": "Yoplait Drink",
        "description": "Nonspecific abnormal findings in cerebrospinal fluid",
        "price": "12.12"
      }, {
        "id": 34,
        "name": "Longos - Chicken Curried",
        "description": "Central corneal ulcer",
        "price": "82.23"
      }, {
        "id": 35,
        "name": "Pork Loin Cutlets",
        "description": "Unspecified protein-calorie malnutrition",
        "price": "8.19"
      }, {
        "id": 36,
        "name": "Orange - Blood",
        "description": "Femoral hernia without mention of obstruction or gangrene, bilateral (not specified as recurrent)",
        "price": "1.47"
      }, {
        "id": 37,
        "name": "Scallop - St. Jaques",
        "description": "Superficial thrombophlebitis complicating pregnancy and the puerperium, delivered, with or without mention of antepartum condition",
        "price": "78.57"
      }, {
        "id": 38,
        "name": "Ice Cream - Life Savers",
        "description": "Machinery accident in water transport injuring occupant of small boat, unpowered",
        "price": "69.91"
      }, {
        "id": 39,
        "name": "Wine - Zinfandel California 2002",
        "description": "Mumps with unspecified complication",
        "price": "44.51"
      }, {
        "id": 40,
        "name": "Pastry - Banana Muffin - Mini",
        "description": "Atresia and stenosis of aorta",
        "price": "71.56"
      }, {
        "id": 41,
        "name": "Bread - 10 Grain",
        "description": "Accidents caused by knives, swords, and daggers",
        "price": "72.01"
      }, {
        "id": 42,
        "name": "Veal - Chops, Split, Frenched",
        "description": "Lymphosarcoma, intra-abdominal lymph nodes",
        "price": "62.36"
      }, {
        "id": 43,
        "name": "Wine - Red, Pelee Island Merlot",
        "description": "Chronic fatigue syndrome",
        "price": "83.00"
      }, {
        "id": 44,
        "name": "Beets",
        "description": "Injury due to war operations by destruction of aircraft due to collision with other aircraft",
        "price": "61.54"
      }, {
        "id": 45,
        "name": "Raisin - Dark",
        "description": "Late effect of fracture of spine and trunk without mention of spinal cord lesion",
        "price": "36.96"
      }, {
        "id": 46,
        "name": "Wine - Pinot Noir Latour",
        "description": "Mitral and aortic valve diseases, unspecified",
        "price": "79.44"
      }, {
        "id": 47,
        "name": "Pasta - Fusili, Dry",
        "description": "Other nerve root and plexus disorders",
        "price": "65.11"
      }, {
        "id": 48,
        "name": "Sugar - Brown, Individual",
        "description": "Congenital diplegia",
        "price": "48.43"
      }, {
        "id": 49,
        "name": "Parasol Pick Stir Stick",
        "description": "Closed fractures involving skull or face with other bones, without mention or intracranial injury, with prolonged [more than 24 hours] loss of consciousness and return to pre-existing conscious level",
        "price": "50.52"
      }, {
        "id": 50,
        "name": "Lamb Rack Frenched Australian",
        "description": "Poisoning by liver preparations and other antianemic agents",
        "price": "25.85"
      }, {
        "id": 51,
        "name": "Fib N9 - Prague Powder",
        "description": "Incompetence or weakening of pubocervical tissue",
        "price": "85.71"
      }, {
        "id": 52,
        "name": "Cod - Fillets",
        "description": "Arthropathy associated with other viral diseases, multiple sites",
        "price": "98.30"
      }, {
        "id": 53,
        "name": "Sage - Ground",
        "description": "Trichostrongyliasis",
        "price": "28.89"
      }, {
        "id": 54,
        "name": "Madeira",
        "description": "Multiple open fractures involving both upper limbs, and upper limb with rib(s) and sternum",
        "price": "94.87"
      }, {
        "id": 55,
        "name": "Cookie Dough - Peanut Butter",
        "description": "Unspecified polyarthropathy or polyarthritis, shoulder region",
        "price": "51.56"
      }, {
        "id": 56,
        "name": "Remy Red",
        "description": "Circadian rhythm sleep disorder, jet lag type",
        "price": "32.01"
      }, {
        "id": 57,
        "name": "Salami - Genova",
        "description": "Aftercare for healing pathologic fracture of lower arm",
        "price": "16.45"
      }, {
        "id": 58,
        "name": "Soup Knorr Chili With Beans",
        "description": "Acute osteomyelitis, multiple sites",
        "price": "45.83"
      }, {
        "id": 59,
        "name": "Lamb - Whole, Fresh",
        "description": "Thyrotoxicosis from ectopic thyroid nodule without mention of thyrotoxic crisis or storm",
        "price": "67.86"
      }, {
        "id": 60,
        "name": "Wine - Lou Black Shiraz",
        "description": "Mild intellectual disabilities",
        "price": "8.99"
      }, {
        "id": 61,
        "name": "Scallops - 10/20",
        "description": "Villonodular synovitis, shoulder region",
        "price": "91.04"
      }, {
        "id": 62,
        "name": "Cheese - Feta",
        "description": "Anterior subcapsular polar cataract",
        "price": "6.15"
      }, {
        "id": 63,
        "name": "Potatoes - Idaho 100 Count",
        "description": "Late effects of cerebrovascular disease, other paralytic syndrome, bilateral",
        "price": "70.76"
      }, {
        "id": 64,
        "name": "V8 Pet",
        "description": "Thoracic aortic ectasia",
        "price": "2.04"
      }, {
        "id": 65,
        "name": "Wine - Bouchard La Vignee Pinot",
        "description": "Tuberculosis of bronchus, tubercle bacilli found (in sputum) by microscopy",
        "price": "76.04"
      }, {
        "id": 66,
        "name": "Beans - Butter Lrg Lima",
        "description": "Personal history of malaria",
        "price": "60.32"
      }, {
        "id": 67,
        "name": "Bay Leaf",
        "description": "Cerebral atherosclerosis",
        "price": "1.38"
      }, {
        "id": 68,
        "name": "Pastry - Plain Baked Croissant",
        "description": "Crushing injury of multiple sites of upper arm",
        "price": "85.49"
      }, {
        "id": 69,
        "name": "Cookie Dough - Double",
        "description": "Other complications due to nervous system device, implant, and graft",
        "price": "11.42"
      }, {
        "id": 70,
        "name": "Ham - Black Forest",
        "description": "Transient paralysis of limb",
        "price": "40.36"
      }, {
        "id": 71,
        "name": "Wine - White, Chardonnay",
        "description": "Failure in dosage in electroshock or insulin-shock therapy",
        "price": "29.50"
      }, {
        "id": 72,
        "name": "Versatainer Nc - 888",
        "description": "Malignant neoplasm of body of pancreas",
        "price": "41.66"
      }, {
        "id": 73,
        "name": "Vegetable - Base",
        "description": "Closed fractures involving skull or face with other bones, without mention of intracranial injury, with moderate [1-24 hours] loss of consciousness",
        "price": "96.13"
      }, {
        "id": 74,
        "name": "Sword Pick Asst",
        "description": "Suicide and self-inflicted injury by electrocution",
        "price": "35.09"
      }, {
        "id": 75,
        "name": "Transfer Sheets",
        "description": "Malignant neoplasm of ampulla of vater",
        "price": "76.52"
      }, {
        "id": 76,
        "name": "Doilies - 5, Paper",
        "description": "Central pain syndrome",
        "price": "57.42"
      }, {
        "id": 77,
        "name": "Wine - Saint Emilion Calvet",
        "description": "Ornithosis, unspecified",
        "price": "43.44"
      }, {
        "id": 78,
        "name": "Dip - Tapenade",
        "description": "Opioid abuse, unspecified",
        "price": "85.13"
      }, {
        "id": 79,
        "name": "Beef - Striploin Aa",
        "description": "Dyspepsia and other specified disorders of function of stomach",
        "price": "84.65"
      }, {
        "id": 80,
        "name": "Wine - Black Tower Qr",
        "description": "Injury to posterior tibial nerve",
        "price": "14.83"
      }, {
        "id": 81,
        "name": "Thyme - Fresh",
        "description": "Inflamed seborrheic keratosis",
        "price": "7.14"
      }, {
        "id": 82,
        "name": "Port - 74 Brights",
        "description": "Frostbite of face",
        "price": "52.75"
      }, {
        "id": 83,
        "name": "Bread - Roll, Calabrese",
        "description": "Better eye: moderate vision impairment; lesser eye: profound vision impairment",
        "price": "57.68"
      }, {
        "id": 84,
        "name": "Squash - Pepper",
        "description": "Psychosexual dysfunction with other specified psychosexual dysfunctions",
        "price": "26.33"
      }, {
        "id": 85,
        "name": "Wheat - Soft Kernal Of Wheat",
        "description": "Other fetal and newborn aspiration without respiratory symptoms",
        "price": "44.40"
      }];
    articles = new BehaviorSubject(this._articles);
    
    constructor() { }
    
    all(): Observable<Article[]> {
        return this.articles.asObservable();
    }

    get(articleId: number): Observable<Article> {
      const article = this._articles.find((a) => {
        return a.id === articleId;
      });
      return of(article ?? null); // ?? -> Si la izquierda es falso, null o undefined, devuelve valor de la derecha.
    }

    append(article: Article): Observable<Article[]> {
        const lastArticleId = this._articles[this._articles.length - 1].id;
        this._articles.concat({...article, ...{ id: lastArticleId + 1 }});
        this.articles.next(this._articles);
        return this.articles.asObservable();
    }

    replace(article: Article): Observable<Article[]> {
        const index = this._articles.findIndex(a => a.id === article.id);
        this._articles[index].name = article.name;
        this._articles[index].description = article.description;
        this._articles[index].price = article.price;
        this.articles.next(this._articles);
        return this.articles.asObservable();
    }

    delete(articleId: any): Observable<Article[]> {
      const index = this._articles.findIndex(a => a.id === articleId);
      this._articles.splice(index, 1);
      this.articles.next(this._articles);
      return this.articles.asObservable();
    }
}