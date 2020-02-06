export const sendFnToTree =
		function (fn) {
			this.$store.commit('common/sendFn', {fn});
		};

