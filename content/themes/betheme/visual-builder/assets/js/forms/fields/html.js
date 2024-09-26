function mfn_field_html(field) {
	return field.html.replaceAll('postid', mfnvbvars.pageid);
}