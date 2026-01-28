import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [deliveryDistance, setDeliveryDistance] = useState(5);

  const products: Product[] = [
    {
      id: 1,
      name: 'Шоколадный торт "Прага"',
      price: 1200,
      category: 'cakes',
      image: 'https://cdn.poehali.dev/projects/1b462873-6ca0-4712-8f05-9a57ffa723dd/files/8cd7092c-6808-47f5-ab1d-ba923e6c8b52.jpg',
      description: 'Классический торт с шоколадным кремом'
    },
    {
      id: 2,
      name: 'Французские макаруны',
      price: 450,
      category: 'macarons',
      image: 'https://cdn.poehali.dev/projects/1b462873-6ca0-4712-8f05-9a57ffa723dd/files/be97dd0f-ebe2-4d96-8a53-919a6b8d295e.jpg',
      description: 'Набор из 6 макарунов разных вкусов'
    },
    {
      id: 3,
      name: 'Чизкейк Нью-Йорк',
      price: 980,
      category: 'cakes',
      image: 'https://cdn.poehali.dev/projects/1b462873-6ca0-4712-8f05-9a57ffa723dd/files/8cd7092c-6808-47f5-ab1d-ba923e6c8b52.jpg',
      description: 'Нежный чизкейк с ягодным соусом'
    },
    {
      id: 4,
      name: 'Эклеры ассорти',
      price: 550,
      category: 'eclairs',
      image: 'https://cdn.poehali.dev/projects/1b462873-6ca0-4712-8f05-9a57ffa723dd/files/be97dd0f-ebe2-4d96-8a53-919a6b8d295e.jpg',
      description: 'Набор из 4 эклеров с разными начинками'
    },
    {
      id: 5,
      name: 'Медовик домашний',
      price: 890,
      category: 'cakes',
      image: 'https://cdn.poehali.dev/projects/1b462873-6ca0-4712-8f05-9a57ffa723dd/files/8cd7092c-6808-47f5-ab1d-ba923e6c8b52.jpg',
      description: 'Торт из медовых коржей со сметанным кремом'
    },
    {
      id: 6,
      name: 'Капкейки шоколадные',
      price: 380,
      category: 'cupcakes',
      image: 'https://cdn.poehali.dev/projects/1b462873-6ca0-4712-8f05-9a57ffa723dd/files/be97dd0f-ebe2-4d96-8a53-919a6b8d295e.jpg',
      description: 'Набор из 4 капкейков с кремом'
    }
  ];

  const reviews: Review[] = [
    {
      id: 1,
      author: 'Анна Смирнова',
      rating: 5,
      text: 'Заказывала торт Прага на день рождения. Все гости были в восторге! Очень вкусный и красивый.',
      date: '15 января 2026'
    },
    {
      id: 2,
      author: 'Михаил Петров',
      rating: 5,
      text: 'Макаруны просто восхитительные! Нежные, тают во рту. Доставка быстрая.',
      date: '12 января 2026'
    },
    {
      id: 3,
      author: 'Елена Волкова',
      rating: 4,
      text: 'Отличное качество, свежие продукты. Немного дороговато, но того стоит.',
      date: '8 января 2026'
    }
  ];

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const calculateDelivery = () => {
    if (deliveryDistance <= 3) return 0;
    if (deliveryDistance <= 5) return 150;
    if (deliveryDistance <= 10) return 300;
    return 500;
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCost = calculateDelivery();
  const total = cartTotal + deliveryCost;

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="CakeSlice" size={32} className="text-primary" />
              <h1 className="text-4xl font-heading font-bold text-primary">Сладкий Дворик</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#catalog" className="text-foreground hover:text-primary transition-colors font-medium">
                Каталог
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
                О нас
              </a>
              <a href="#reviews" className="text-foreground hover:text-primary transition-colors font-medium">
                Отзывы
              </a>
              <a href="#contacts" className="text-foreground hover:text-primary transition-colors font-medium">
                Контакты
              </a>
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="lg" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="font-heading text-3xl">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h4 className="font-heading text-xl font-semibold">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-auto text-destructive"
                                  >
                                    <Icon name="Trash2" size={16} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <Separator />
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="delivery">Расстояние доставки (км)</Label>
                          <Input
                            id="delivery"
                            type="number"
                            min="1"
                            value={deliveryDistance}
                            onChange={(e) => setDeliveryDistance(Number(e.target.value))}
                          />
                          <p className="text-sm text-muted-foreground">
                            {deliveryDistance <= 3 && 'Бесплатная доставка! 🎉'}
                            {deliveryDistance > 3 && deliveryDistance <= 5 && 'Доставка: 150 ₽'}
                            {deliveryDistance > 5 && deliveryDistance <= 10 && 'Доставка: 300 ₽'}
                            {deliveryDistance > 10 && 'Доставка: 500 ₽'}
                          </p>
                        </div>
                        <div className="flex justify-between text-lg">
                          <span>Товары:</span>
                          <span className="font-semibold">{cartTotal} ₽</span>
                        </div>
                        <div className="flex justify-between text-lg">
                          <span>Доставка:</span>
                          <span className="font-semibold">{deliveryCost} ₽</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-xl font-bold">
                          <span>Итого:</span>
                          <span className="text-primary">{total} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section className="relative h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://cdn.poehali.dev/projects/1b462873-6ca0-4712-8f05-9a57ffa723dd/files/6887c62d-2257-46b5-b8c5-747592260a06.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white animate-fade-in">
            <h2 className="text-6xl md:text-7xl font-heading font-bold mb-4">
              Домашняя выпечка с любовью
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-95">
              Свежие торты, пирожные и десерты из лучших ингредиентов
            </p>
            <Button size="lg" className="text-lg px-8">
              Смотреть каталог
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-heading font-bold text-center mb-12 text-primary">
            Наше меню
          </h2>
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 mb-8">
              <TabsTrigger value="all" className="font-medium">Все</TabsTrigger>
              <TabsTrigger value="cakes" className="font-medium">Торты</TabsTrigger>
              <TabsTrigger value="macarons" className="font-medium">Макаруны</TabsTrigger>
              <TabsTrigger value="eclairs" className="font-medium">Эклеры</TabsTrigger>
              <TabsTrigger value="cupcakes" className="font-medium">Капкейки</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow animate-scale-in">
                <CardHeader className="p-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="font-heading text-2xl mb-2">{product.name}</CardTitle>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full" onClick={() => addToCart(product)}>
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-heading font-bold mb-6 text-primary">О нас</h2>
            <p className="text-lg leading-relaxed mb-4">
              Кондитерская "Сладкий Дворик" работает с 2015 года. Мы создаем десерты по классическим
              рецептам, используя только натуральные ингредиенты высшего качества.
            </p>
            <p className="text-lg leading-relaxed mb-8">
              Каждый торт и пирожное мы готовим с любовью и вниманием к деталям. Наша цель —
              радовать вас вкусом и создавать праздничное настроение!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Award" size={32} className="text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-2">10+ лет</h3>
                <p className="text-muted-foreground">на рынке</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={32} className="text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-2">5000+</h3>
                <p className="text-muted-foreground">довольных клиентов</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Heart" size={32} className="text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-2">100%</h3>
                <p className="text-muted-foreground">натуральные продукты</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-heading font-bold text-center mb-12 text-primary">
            Отзывы наших клиентов
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review) => (
              <Card key={review.id} className="animate-fade-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-heading text-xl">{review.author}</CardTitle>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={16}
                          className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-heading font-bold mb-8 text-primary">Контакты</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <Icon name="MapPin" size={32} className="text-primary mb-3" />
                <h3 className="font-heading text-xl font-bold mb-2">Адрес</h3>
                <p className="text-muted-foreground">г. Москва, ул. Кондитерская, д. 15</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon name="Phone" size={32} className="text-primary mb-3" />
                <h3 className="font-heading text-xl font-bold mb-2">Телефон</h3>
                <p className="text-muted-foreground">+7 (495) 123-45-67</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon name="Clock" size={32} className="text-primary mb-3" />
                <h3 className="font-heading text-xl font-bold mb-2">Режим работы</h3>
                <p className="text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-heading text-2xl mb-2">Сладкий Дворик</p>
          <p className="opacity-90">© 2026 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
