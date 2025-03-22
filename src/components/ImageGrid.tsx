
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Eye, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface ImageItem {
  id: number;
  src: string;
  title: string;
  aspectRatio: number;
}

// Generate images with varying aspect ratios
const generateImages = (count: number): ImageItem[] => {
  const images = [];
  const categories = [
    'nature', 'architecture', 'food', 'travel', 'fashion', 'art',
    'animals', 'technology', 'interior', 'cars', 'people', 'abstract',
    'plants', 'space', 'underwater', 'sports', 'vintage', 'minimal'
  ];
  
  for (let i = 1; i <= count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const width = 800;
    const height = Math.floor(Math.random() * 400) + 400; // Random height between 400 and 800
    
    // Add random number to avoid caching and get truly random images
    const randomParam = Math.floor(Math.random() * 1000);
    
    images.push({
      id: i,
      src: `https://source.unsplash.com/random/${width}x${height}?${category}&sig=${randomParam}`,
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Image ${i}`,
      aspectRatio: height / width * 100
    });
  }
  
  return images;
};

const ImageGrid = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Generate random images
    setImages(generateImages(36)); // Increased from 24 to 36 images
    setLoading(false);
  }, []);
  
  const handleView = (title: string) => {
    toast.info(`Viewing: ${title}`);
  };
  
  const handleBuy = (title: string) => {
    toast.success(`Added to cart: ${title}`);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="text-sm text-muted-foreground">Loading beautiful images...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="masonry-grid p-4">
      {images.map((image) => (
        <div 
          key={image.id} 
          className="pin-item"
          style={{ '--aspect-ratio': `${image.aspectRatio}%` } as React.CSSProperties}
        >
          <img 
            src={image.src} 
            alt={image.title} 
            className="pin-image"
            loading="lazy"
          />
          <div className="pin-overlay">
            <div className="pin-actions">
              <button 
                onClick={() => handleView(image.title)}
                className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 text-sm font-medium flex items-center gap-1 shadow-sm"
              >
                <Eye size={16} />
                <span>View</span>
              </button>
              <button 
                onClick={() => handleBuy(image.title)}
                className="px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 text-sm font-medium flex items-center gap-1 shadow-sm"
              >
                <ShoppingCart size={16} />
                <span>Buy</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
