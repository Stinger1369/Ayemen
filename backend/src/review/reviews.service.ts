import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import axios from 'axios';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    // Si aucune image n'est fournie, utiliser Unsplash pour en générer une
    if (!createReviewDto.image) {
      try {
        const accessKey =
          process.env.UNSPLASH_ACCESS_KEY || 'YOUR_UNSPLASH_ACCESS_KEY';
        const response = await axios.get(
          'https://api.unsplash.com/search/photos',
          {
            params: {
              query: createReviewDto.query,
              per_page: 1,
              orientation: 'portrait',
            },
            headers: {
              Authorization: `Client-ID ${accessKey}`,
            },
          },
        );

        if (response.data.results.length > 0) {
          createReviewDto.image = response.data.results[0].urls.small;
        } else {
          createReviewDto.image =
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80';
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'image Unsplash:",
          error,
        );
        createReviewDto.image =
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80';
      }
    }

    const createdReview = new this.reviewModel(createReviewDto);
    return createdReview.save();
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async findOne(id: string): Promise<Review> {
    return this.reviewModel.findById(id).exec();
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    return this.reviewModel
      .findByIdAndUpdate(id, updateReviewDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Review> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }
}
