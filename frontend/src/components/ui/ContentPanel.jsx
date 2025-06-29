export const Content = () => {
  return (
    <section className="h-full flex-1 overflow-auto">
        {/* put width full doesnt work using div bellow since it has not fixed width. Applying flex-1 doesnt either, so put the flex in section */}
      <div className="">
        <div>
            <img src="https://images.pexels.com/photos/1553963/pexels-photo-1553963.jpeg" alt="image" />
        </div>
      </div>
    </section>
  );
};
