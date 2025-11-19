import "./FilterBar.css";

type FilterBarProps = {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    sortOption: string;
    onSortChange: (option: string) => void;
    onResetFilters: () => void;
};

const FilterBar = ({
    categories,
    selectedCategory,
    onSelectCategory,
    searchTerm,
    onSearchChange,
    sortOption,
    onSortChange,
    onResetFilters,
}: FilterBarProps) => {
    return (
        <section className="ts-filter">
            <div className="ts-filter__search">
                <input
                    type="text"
                    placeholder="Tìm kiếm thiết bị, hãng, cấu hình..."
                    value={searchTerm}
                    onChange={(event) => onSearchChange(event.target.value)}
                />
                <button className="ts-btn" onClick={onResetFilters}>
                    Làm mới
                </button>
            </div>

            <div className="ts-filter__categories">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`ts-chip ${
                            selectedCategory === category ? "is-active" : ""
                        }`}
                        onClick={() => onSelectCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="ts-filter__sort">
                <label htmlFor="sort">Sắp xếp:</label>
                <select
                    id="sort"
                    value={sortOption}
                    onChange={(event) => onSortChange(event.target.value)}
                >
                    <option value="featured">Nổi bật</option>
                    <option value="price-asc">Giá tăng dần</option>
                    <option value="price-desc">Giá giảm dần</option>
                    <option value="rating">Đánh giá cao nhất</option>
                    <option value="stock">Số lượng còn nhiều</option>
                </select>
            </div>
        </section>
    );
};

export default FilterBar;

