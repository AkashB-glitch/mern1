import Post from '../models/Post.js';

export const getCategoryStats = async (req, res) => {
  try {
    const categoryStats = await Post.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Create a map of category counts
    const statsMap = {};
    categoryStats.forEach(stat => {
      statsMap[stat._id] = stat.count;
    });

    // Define all categories with their counts (0 if no posts)
    const categories = [
      { name: 'General Discussion', count: statsMap['General Discussion'] || 0 },
      { name: 'Web Development', count: statsMap['Web Development'] || 0 },
      { name: 'Mobile Apps', count: statsMap['Mobile Apps'] || 0 },
      { name: 'AI & Machine Learning', count: statsMap['AI & Machine Learning'] || 0 },
      { name: 'DevOps', count: statsMap['DevOps'] || 0 },
      { name: 'Off Topic', count: statsMap['Off Topic'] || 0 }
    ];

    res.json(categories);
  } catch (error) {
    console.error('Error fetching category stats:', error);
    res.status(500).json({ message: 'Error fetching category statistics' });
  }
};