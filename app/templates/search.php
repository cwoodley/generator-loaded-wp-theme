<?php
/**
 * The template for displaying search results pages.
 *
 * @package <%= themeslug %>
 */

get_header(); ?>

	<?php if ( have_posts() ) : ?>
		<?php printf( __( 'Search Results for: %s', '<%= themeslug %>' ), '<span>' . get_search_query() . '</span>' ); ?></h1>

		<?php /* Start the Loop */ ?>
		<?php while ( have_posts() ) : the_post(); ?>

		<?php endwhile; ?>

	<?php endif; ?>

<?php get_sidebar(); ?>
<?php get_footer(); ?>
