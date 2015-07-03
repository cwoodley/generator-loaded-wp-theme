<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package <%= themeslug %>
 */

get_header(); ?>

		<?php if ( have_posts() ) : ?>

			<?php /* Start the Loop */ ?>
			<?php while ( have_posts() ) : the_post(); ?>

				<?php if (is_archive() ) : ?>
				  <?php the_title( '<h2 class="entry-title">', '</h2>' ); ?>
				<?php else : ?>
				  <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
				<?php endif ?>

				<?php the_content(); ?>

			<?php endwhile; ?>

		<?php endif; ?>

<?php get_sidebar(); ?>
<?php get_footer(); ?>
