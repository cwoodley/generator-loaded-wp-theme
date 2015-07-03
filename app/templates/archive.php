<?php
/**
 * The template for displaying archive pages.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package <%= themeslug %>
 */

get_header(); ?>

	<?php if ( have_posts() ) : ?>
			<h1>
				<?php
					if ( is_category() ) :
						single_cat_title();

					elseif ( is_tag() ) :
						single_tag_title();

					elseif ( is_author() ) :
						printf( __( 'Author: %s', '<%= themeslug %>' ), '<span class="vcard">' . get_the_author() . '</span>' );

					elseif ( is_day() ) :
						printf( __( 'Day: %s', '<%= themeslug %>' ), '<span>' . get_the_date() . '</span>' );

					elseif ( is_month() ) :
						printf( __( 'Month: %s', '<%= themeslug %>' ), '<span>' . get_the_date( _x( 'F Y', 'monthly archives date format', '<%= themeslug %>' ) ) . '</span>' );

					elseif ( is_year() ) :
						printf( __( 'Year: %s', '<%= themeslug %>' ), '<span>' . get_the_date( _x( 'Y', 'yearly archives date format', '<%= themeslug %>' ) ) . '</span>' );

					elseif ( is_tax( 'post_format', 'post-format-aside' ) ) :
						_e( 'Asides', '<%= themeslug %>' );

					elseif ( is_tax( 'post_format', 'post-format-gallery' ) ) :
						_e( 'Galleries', '<%= themeslug %>' );

					elseif ( is_tax( 'post_format', 'post-format-image' ) ) :
						_e( 'Images', '<%= themeslug %>' );

					elseif ( is_tax( 'post_format', 'post-format-video' ) ) :
						_e( 'Videos', '<%= themeslug %>' );

					elseif ( is_tax( 'post_format', 'post-format-quote' ) ) :
						_e( 'Quotes', '<%= themeslug %>' );

					elseif ( is_tax( 'post_format', 'post-format-link' ) ) :
						_e( 'Links', '<%= themeslug %>' );

					elseif ( is_tax( 'post_format', 'post-format-status' ) ) :
						_e( 'Statuses', '<%= themeslug %>' );

					elseif ( is_tax( 'post_format', 'post-format-audio' ) ) :
						_e( 'Audios', '<%= themeslug %>' );

					elseif ( is_tax( 'post_format', 'post-format-chat' ) ) :
						_e( 'Chats', '<%= themeslug %>' );

					else :
						_e( 'Archives', '<%= themeslug %>' );

					endif;
				?>
			</h1>
			<?php
				// Show an optional term description.
				$term_description = term_description();
				if ( ! empty( $term_description ) ) :
					printf( '<div class="taxonomy-description">%s</div>', $term_description );
				endif;
			?>

		<?php /* Start the Loop */ ?>
		<?php while ( have_posts() ) : the_post(); ?>



		<?php endwhile; ?>

		<?php <%= themeslug %>_paging_nav(); ?>

	<?php else : ?>

	<?php endif; ?>


<?php get_sidebar(); ?>
<?php get_footer(); ?>
