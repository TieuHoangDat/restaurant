
module.exports = {
    async afterCreate(event) {
        const id = parseInt(event.params.data.restaurant);
        console.log(event.params.data.restaurant)
        

        const entries = await strapi.entityService.findMany('api::review.review', {
            filters: { 
                restaurant: { id: id } // Sử dụng cú pháp object cho restaurant
            },
            populate: { restaurant: true },
        });
        console.log(entries)

        const ratingMapping = {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5
        };
          
          // Tính toán trung bình rating
        const calculateAverageRating = (reviews) => {
            const totalRatings = reviews.reduce((acc, review) => {
                const ratingValue = ratingMapping[review.rating.toLowerCase()]; // Chuyển chuỗi 'five' thành 5
                return acc + (ratingValue || 0); // Nếu không có giá trị, mặc định là 0
            }, 0);
            
            const averageRating = totalRatings / reviews.length;
            return averageRating;
        };
        
        const averageRating = calculateAverageRating(entries);
        console.log('Average Rating:', averageRating);

        const entry = await strapi.entityService.update('api::restaurant.restaurant', id, {
            data: {
                rating: averageRating,
            },
        });
    },

    async afterUpdate(event) {
        const id = parseInt(event.params.data.restaurant);
        console.log(event.params.data.restaurant)
        

        const entries = await strapi.entityService.findMany('api::review.review', {
            filters: { 
                restaurant: { id: id } // Sử dụng cú pháp object cho restaurant
            },
            populate: { restaurant: true },
        });
        console.log(entries)

        const ratingMapping = {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5
        };
          
          // Tính toán trung bình rating
        const calculateAverageRating = (reviews) => {
            const totalRatings = reviews.reduce((acc, review) => {
                const ratingValue = ratingMapping[review.rating.toLowerCase()]; // Chuyển chuỗi 'five' thành 5
                return acc + (ratingValue || 0); // Nếu không có giá trị, mặc định là 0
            }, 0);
            
            const averageRating = totalRatings / reviews.length;
            return averageRating;
        };
        
        const averageRating = calculateAverageRating(entries);
        console.log('Average Rating:', averageRating);

        const entry = await strapi.entityService.update('api::restaurant.restaurant', id, {
            data: {
                rating: averageRating,
            },
        });
    },

};