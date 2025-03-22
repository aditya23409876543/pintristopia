
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Eye, ShoppingCart, ImageOff } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

interface ImageItem {
  id: number;
  src: string;
  title: string;
  aspectRatio: number;
}

// Generate images with more reliable sources
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
    
    // Use more reliable image source with random ID and specific size
    const imageId = Math.floor(Math.random() * 1000);
    
    images.push({
      id: i,
      src: `https://picsum.photos/seed/${category}-${imageId}/${width}/${height}`,
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Image ${i}`,
      aspectRatio: height / width * 100
    });
  }
  
  return images;
};

const ImageGrid = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  
  useEffect(() => {
    // Generate random images
    setImages(generateImages(36));
    
    // Set loading to false after a short delay to allow images to start loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleImageError = (imageId: number) => {
    setImageErrors(prev => ({
      ...prev,
      [imageId]: true
    }));
  };
  
  const handleView = (title: string) => {
    toast.info(`Viewing: ${title}`);
  };
  
  const handleBuy = (title: string) => {
    toast.success(`Added to cart: ${title}`);
  };
  
  if (loading) {
    return (
      <div className="masonry-grid p-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="pin-item">
            <Skeleton className="w-full h-full absolute inset-0" />
          </div>
        ))}
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
          {imageErrors[image.id] ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted text-muted-foreground">
              <ImageOff size={32} className="mb-2 opacity-70" />
              <p className="text-sm">Image not available</p>
            </div>
          ) : (
            <img 
              src={image.src} 
              alt={image.title} 
              className="pin-image"
              loading="lazy"
              onError={() => handleImageError(image.id)}
            />
          )}
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
