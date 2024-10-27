import Array "mo:base/Array";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Float "mo:base/Float";  // Import the Float module

actor {
    public type Comment = {
        username: Text;
        message: Text;
    };

    public type Product = {
        id: Nat;
        name: Text;
        price: Nat;
        description: Text;
        inStock: Bool;
        category: Text;
        stockAmount: Nat;
        rating: Float;
        ratingCount: Nat;
        comments: [Comment];
        photoUrl: ?Text;
    };

    private stable var nextProductId: Nat = 0;
    private var products = HashMap.HashMap<Nat, Product>(0, Nat.equal, Hash.hash);

    public shared(msg) func addProduct(
        name: Text,
        price: Nat,
        description: Text,
        category: Text,
        stockAmount: Nat,
        photoUrl: ?Text
    ) : async Nat {
        let productId = nextProductId;
        let product: Product = {
            id = productId;
            name = name;
            price = price;
            description = description;
            inStock = stockAmount > 0;
            category = category;
            stockAmount = stockAmount;
            rating = 0.0;
            ratingCount = 0;
            comments = [];
            photoUrl = photoUrl;
        };
        products.put(productId, product);
        nextProductId += 1;
        return productId;
    };

    public query func getAllProducts() : async [Product] {
        let productIter = products.vals();
        return Iter.toArray(productIter);
    };

    public query func getProduct(id: Nat) : async ?Product {
        return products.get(id);
    };

    public shared(msg) func addComment(id: Nat, comment: Comment) : async Bool {
        switch (products.get(id)) {
            case (null) { return false; };
            case (?product) {
                let updatedComments = Array.append(product.comments, [comment]);
                let updatedProduct: Product = {
                    id = product.id;
                    name = product.name;
                    price = product.price;
                    description = product.description;
                    inStock = product.inStock;
                    category = product.category;
                    stockAmount = product.stockAmount;
                    rating = product.rating;
                    ratingCount = product.ratingCount;
                    comments = updatedComments;
                    photoUrl = product.photoUrl;
                };
                products.put(id, updatedProduct);
                return true;
            };
        }
    };

    public shared(msg) func rateProduct(id: Nat, rating: Nat) : async Bool {
        switch (products.get(id)) {
            case (null) { return false; };
            case (?product) {
                let newRating = 
                    if (product.ratingCount == 0)
                        Float.fromInt(rating)
                    else
                        ((product.rating * Float.fromInt(product.ratingCount) + Float.fromInt(rating))
                        / Float.fromInt(product.ratingCount + 1));
                
                let updatedProduct: Product = {
                    id = product.id;
                    name = product.name;
                    price = product.price;
                    description = product.description;
                    inStock = product.inStock;
                    category = product.category;
                    stockAmount = product.stockAmount;
                    rating = newRating;
                    ratingCount = product.ratingCount + 1;
                    comments = product.comments;
                    photoUrl = product.photoUrl;
                };
                products.put(id, updatedProduct);
                return true;
            };
        }
    };

    public shared(msg) func updateStockStatus(id: Nat, stockAmount: Nat) : async Bool {
        switch (products.get(id)) {
            case (null) { return false; };
            case (?product) {
                let updatedProduct: Product = {
                    id = product.id;
                    name = product.name;
                    price = product.price;
                    description = product.description;
                    inStock = stockAmount > 0;
                    category = product.category;
                    stockAmount = stockAmount;
                    rating = product.rating;
                    ratingCount = product.ratingCount;
                    comments = product.comments;
                    photoUrl = product.photoUrl;
                };
                products.put(id, updatedProduct);
                return true;
            };
        }
    };
}
