<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @package <%= themeslug %>
 */

get_header(); ?>

	<h1 class="page-title"><?php _e( 'Oops! That page can&rsquo;t be found.', '<%= themeslug %>' ); ?></h1>
	<p><?php _e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', '<%= themeslug %>' ); ?></p>
	<?php get_search_form(); ?>

<?php get_footer(); ?>
