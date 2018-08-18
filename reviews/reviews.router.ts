import { Review } from './reviews.model';
import {ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import * as mongoose from 'mongoose';



class ReviewsRouter extends ModelRouter<Review>{
    constructor(){
        super(Review)
    }

   // findById = (req, resp, next)=>{
   // this.model.findById(req.params.id)
   //     .populate('user','name')
   //     .populate('restaurant', 'name')
   //     .then(this.render(resp, next))
   //     .catch(next)
 // }
  protected prepareOne(query: mongoose.DocumentQuery<Review,Review>): mongoose.DocumentQuery<D,D>{
    return query.populate('user', 'name')
                .populate('restaurant', 'name')
  }

    

    applyRoutes(application: restify.Server){
    application.get('/reviews', this.findAll)
    application.get('/reviews/:id', [this.validateId, this.findById])
    application.post('/reviews', this.save)
  }
}

export const reviewsRouter = new ReviewsRouter()